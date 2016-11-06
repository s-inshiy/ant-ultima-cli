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
export class BranchService {

  constructor(private http: Http) {}

  getBranch(page: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches',
      queryString = `?per-page=20&page=${page}`,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(baseUrl + queryString, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createBranch(name = '', regions: [number] = [0]) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches/create',
      body = '&name=' + name + '&regions=' + regions,
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

  deleteBranch(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches/delete?',
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

  updateBranch(id = 0, name = '', regions: [number] = [0]) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches/update?',
      userId = '&id=' + id,
      body = '&name=' + name + '&regions=' + regions,
      headers = new Headers;
    headers.append('Accept', 'application/json;q=0.9');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(baseUrl + userId, body, {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
