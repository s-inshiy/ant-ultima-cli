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
export class BranchService {

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


  getBranch(page: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches',
      queryString = `?per-page=20&page=${page}`;

    return this.get(baseUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createBranch(name = '', regions: [number] = [0]) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches/create',
      body = '&name=' + name + '&regions=' + regions;

    return this.post(baseUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteBranch(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches/delete?',
      userId = '&id=' + id,
      body = '';

    return this.post(baseUrl + userId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  updateBranch(id = 0, name = '', regions: [number] = [0]) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches/update?',
      userId = '&id=' + id,
      body = '&name=' + name + '&regions=' + regions;

    return this.post(baseUrl + userId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
