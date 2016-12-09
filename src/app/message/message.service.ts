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
export class MessageService {

  token = localStorage.getItem('id_token');

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

  getMsgs(page) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/messages',
      msgsQuery = `?per-page=20&page=${page}`;

    return this.get(baseUrl + msgsQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchUsers(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/search/',
      userQuery = `?q=${query}`;
    return this.get(baseUrl + userQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  sentMsgs(id = '', text = '') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/messages/write',
      body = '&user_id=' + id + '&text=' + text;

    return this.post(baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });

  }

}
