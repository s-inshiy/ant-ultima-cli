import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  Headers
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  constructor(private http: Http) {}

  getUsers(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/users',
      queryString = '?per-page=20&page=' + page,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl + queryString, {
        headers: headers
      })
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
      '&patronymic=' + patronymic + '&email=' + email + '&phone=' + encodeURIComponent(phone) + '&username=' + username
       + '&password=' + password,
      headers = new Headers;
    headers.append('Accept', 'application/json;q=0.9');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(baseUrl, body, {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/delete?',
      userId = '&id=' + id,
      body = '',
      headers = new Headers;
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(baseUrl + userId, body, {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  editUserRole(id: number, role = 'admin') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/change-role?',
          userId = '&id=' + id,
          userRole = '&role=' + role,
          headers = new Headers;
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(baseUrl + userId + userRole, {headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  blockUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/block?',
      userId = '&id=' + id,
      headers = new Headers;
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(baseUrl + userId, {headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  unBlockUser(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/unblock?',
      userId = '&id=' + id,
      headers = new Headers;
      headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(baseUrl + userId, {headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
