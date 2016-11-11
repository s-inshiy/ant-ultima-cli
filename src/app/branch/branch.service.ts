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
export class BranchService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getBranch(page: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches',
      queryString = `?per-page=20&page=${page}`;

    return this.authHttp.get(baseUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createBranch(name = '', regions: [number] = [0]) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches/create',
      body = '&name=' + name + '&regions=' + regions;

    return this.authHttp.post(baseUrl, body)
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

    return this.authHttp.post(baseUrl + userId, body)
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

    return this.authHttp.post(baseUrl + userId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
