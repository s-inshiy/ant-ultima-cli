import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  // Headers
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import {
  AuthHttp
} from 'angular2-jwt';


@Injectable()
export class ManagerService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getManagers(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/managers',
      queryString = '?per-page=40&page=' + page;

    return this.authHttp.get(crmUrl + queryString)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  searchUser(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users?',
      name = '&fio=' + query;

    return this.authHttp.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchBranch(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches?',
      name = '&name=' + query;

    return this.authHttp.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createManager(userId = 0, branchId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/create?',
      body = '&user_id=' + userId + '&branch_id=' + branchId;

    return this.authHttp.post(baseUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  updateManager(id = 0, userId = 0, branchId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/update?',
      body = '&user_id=' + userId + '&branch_id=' + branchId,
      managerId = '&id=' + id;

    return this.authHttp.post(baseUrl + managerId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteManager(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/delete?',
      userId = '&id=' + id,
      body = '';

    return this.authHttp.post(baseUrl + userId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }


}
