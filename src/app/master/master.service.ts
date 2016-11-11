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
export class MasterService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getMasters(count: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/masters',
      page = '?per-page=20&page=' + count;

    return this.authHttp.get(crmUrl + page).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchUser(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users',
      name = '?fio=' + query;

    return this.authHttp.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchCompany(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/companies',
      name = '?name=' + query;

    return this.authHttp.get(baseUrl + name).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createMaster(userId = 0, companyId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/create?',
      body = '&account_id=' + userId + '&company_id=' + companyId;

    return this.authHttp.post(baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateMaster(id = 0, userId = 0, companyId = 0) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/update?',
      body = '&account_id=' + userId + '&company_id=' + companyId,
      masterId = '&id=' + id;

    return this.authHttp.post(baseUrl + masterId, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteMaster(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/delete?',
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
