import {
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  Response
} from '@angular/http';

@Injectable()
export class LoginService {

  token: string;
  guardToken: string;

  constructor(private http: Http) {}

  login(login: string, password: string) {
    let body = '&login=' + login + '&password=' + password,
          headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post('http://crm.unicweb.com.ua/api/auth/login', body, {headers: headers})
      .map((response: Response) => {
        this.token = response.json() && response.json().token;
        if (this.token) {
          localStorage.setItem('id_token', this.token);
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
