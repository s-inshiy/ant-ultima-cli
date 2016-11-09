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
export class MasterService {

  constructor(private http: Http) {}

  getMasters(count: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/masters',
      page = '?per-page=20&page=' + count,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl + page).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchUser(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users',
      name = '?fio=' + query;

    return this.http.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchCompany(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/companies',
      name = '?name=' + query;

    return this.http.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createMaster(userId = 0, companyId = 0) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/create?',
      body = '&account_id=' + userId + '&company_id=' + companyId,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(_baseUrl, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateMaster(id = 0, userId = 0, companyId = 0) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/update?',
      body = '&account_id=' + userId + '&company_id=' + companyId,
      masterId = '&id=' + id,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(_baseUrl + masterId, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteMaster(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/delete?',
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
