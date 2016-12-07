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

import {
  AuthHttp
} from 'angular2-jwt';

@Injectable()
export class LandingService {

  constructor(public authHttp: AuthHttp, private http: Http) {}

  getServices() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/tree',
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  setRegistration( type= '', username = '', password = '', email = '',
    firstName = '', secondName = '', patronymic = '', phone = '') {
    let body =  '&role=' + type +  '&username=' + username + '&password=' + password +
      '&email=' + email + '&first_name=' + firstName + '&second_name=' +
      secondName + '&patronymic=' + patronymic + '&phone=' + encodeURIComponent(phone),
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.post('http://crm.unicweb.com.ua/api/auth/register', body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  setCall(service = '', phone = '', email = '') {
    let body = '&service=' + service + '&phone=' + phone + '&email=' + email,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.post('http://crm.unicweb.com.ua/api/requests/create', body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

}
