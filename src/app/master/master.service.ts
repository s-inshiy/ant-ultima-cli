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
export class MasterService {

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

  getMasters(count: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/masters',
      page = '?per-page=20&page=' + count;

    return this.get(crmUrl + page).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchUser(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users',
      name = '?fio=' + query;

    return this.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchCompany(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/companies',
      name = '?name=' + query;

    return this.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createMaster(userId = 0, companyId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/create?',
      body = '&account_id=' + userId + '&company_id=' + companyId;

    return this.post(baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateMaster(id = 0, userId = 0, companyId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/update?',
      body = '&account_id=' + userId + '&company_id=' + companyId,
      masterId = '&id=' + id;

    return this.post(baseUrl + masterId, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteMaster(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/delete?',
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
