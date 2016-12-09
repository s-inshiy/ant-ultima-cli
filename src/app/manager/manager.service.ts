import {
  Injectable
} from '@angular/core';
import {
  Response,
  RequestOptionsArgs
} from '@angular/http';
import {
  Router
} from '@angular/router';
import {
  AuthHttp as JwtAuthHttp
} from 'angular2-jwt';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class ManagerService {

  constructor(public authHttp: JwtAuthHttp, private router: Router) {}

  private isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403;
  }

  private authIntercept(response: Observable < Response > ): Observable < Response > {
    let sharableResponse = response.share();
    sharableResponse.subscribe(null, (err) => {
      if (this.isUnauthorized(err.status)) {
        this.router.navigate(['/login']);
      }
    });
    return sharableResponse;
  }

  public get(url: string, options ? : RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.get(url, options));
  }

  public post(url: string, body: any, options ?: RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.post(url, body, options));
  }

  getManagers(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/managers',
      queryString = '?per-page=40&page=' + page;

    return this.get(crmUrl + queryString)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  searchUser(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users?',
      name = '&fio=' + query;

    return this.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchBranch(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches?',
      name = '&name=' + query;

    return this.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createManager(userId = 0, branchId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/create?',
      body = '&user_id=' + userId + '&branch_id=' + branchId;

    return this.post(baseUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  updateManager(id = 0, userId = 0, branchId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/update?',
      body = '&user_id=' + userId + '&branch_id=' + branchId,
      managerId = '&id=' + id;

    return this.post(baseUrl + managerId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteManager(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/delete?',
      userId = '&id=' + id,
      body = '';

    return this.post(baseUrl + userId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
