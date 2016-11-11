import {
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  Response
} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  public token: string;

  constructor(private http: Http) {
    let currUser = localStorage.getItem('id_token');
    this.token = currUser;
  }

  login(login: string, password: string) {
    let body = '&login=' + login + '&password=' + password,
          headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post('http://crm.unicweb.com.ua/api/auth/login', body, {headers: headers})
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('id_token', token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('id_token');
  }

}
