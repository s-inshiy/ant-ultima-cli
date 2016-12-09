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
export class CallService {

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

  getCalls(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/requests',
      callQuery = `?per-page=20&page=${page}`;

    return this.get(crmUrl + callQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteCall(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/requests/delete',
      deleteId = `?id=${id}`;

    return this.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

}
