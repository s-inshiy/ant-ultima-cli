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
export class UserService {

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

  getUsers(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/users',
      queryString = '?per-page=20&page=' + page;

    return this.get(crmUrl + queryString)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  createUser(firstName = '', secondName = '', patronymic = '',
    email = '', phone = '', username = '', password = '') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/create',
      body = '&first_name=' + firstName + '&second_name=' + secondName +
      '&patronymic=' + patronymic + '&email=' + email + '&phone=' + encodeURIComponent(phone) + '&username=' + username +
      '&password=' + password;

    return this.post(baseUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/delete?',
      userId = 'id=' + id,
      body = '';

    return this.post(baseUrl + userId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  editUserRole(id: number, role = 'admin') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/change-role?',
      userId = '&id=' + id,
      userRole = '&role=' + role;

    return this.get(baseUrl + userId + userRole)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  blockUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/block?',
      userId = '&id=' + id;

    return this.get(baseUrl + userId)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  unBlockUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/unblock?',
      userId = '&id=' + id;

    return this.get(baseUrl + userId)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
