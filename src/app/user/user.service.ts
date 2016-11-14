import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import {
  AuthHttp
} from 'angular2-jwt';

@Injectable()
export class UserService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getUsers(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/users',
      queryString = '?per-page=20&page=' + page;

    return this.authHttp.get(crmUrl + queryString)
      .map((res: Response) => {
        // if (res.status === 401) {
        //   console.log('Log In');
        // }
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

    return this.authHttp.post(baseUrl, body)
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

    return this.authHttp.post(baseUrl + userId, body)
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

    return this.authHttp.get(baseUrl + userId + userRole)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  blockUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/block?',
      userId = '&id=' + id;

    return this.authHttp.get(baseUrl + userId)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  unBlockUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/unblock?',
      userId = '&id=' + id;

    return this.authHttp.get(baseUrl + userId)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
