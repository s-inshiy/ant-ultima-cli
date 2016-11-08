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
export class ManagerService {

  constructor(private http: Http) {}

  getManagers(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/managers',
          queryString = '?per-page=40&page=' + page,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl + queryString, { headers: headers })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  searchUser(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users?',
          name = '&fio=' + query;

          return this.http.get(baseUrl + name).map((res: Response) => {
            return [{
              json: res.json()
            }];
          });
  }

  searchBranch(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/branches?',
          name = '&name=' + query;

          return this.http.get(baseUrl + name).map((res: Response) => {
            return [{
              json: res.json()
            }];
          });
  }

  createManager(userId = 0, branchId = 0) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/managers/create?',
      body = '&user_id=' + userId + '&branch_id=' + branchId,
      headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json;q=0.9');

      return this.http.post(_baseUrl, body, { headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  updateManager(id = 0, userId = 0, branchId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/update?',
          body = '&user_id=' + userId + '&branch_id=' + branchId,
          managerId = '&id=' + id,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

          return this.http.post(baseUrl + managerId, body, {headers: headers})
          .map((res: Response) => {
            return [{
              json: res.json()
            }];
          });
  }

  deleteManager(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/managers/delete?',
          userId = '&id=' + id,
          body = '',
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

          return this.http.post(baseUrl + userId, body, {headers: headers})
            .map((res: Response) => {
              return [{
                json: res.json()
              }];
          });
  }


}
