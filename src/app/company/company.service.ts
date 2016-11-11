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
export class CompanyService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getCompanies(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies',
      queryString = '?per-page=20&page=' + page;

    return this.authHttp.get(crmUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createCompany(name = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies/create',
           body = '&name=' + name;

    return this.authHttp.post(crmUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  updateCompany(id = 0, name = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies/update?',
      companyId = '&id=' + id,
      body = '&name=' + name;

    return this.authHttp.post(crmUrl + companyId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteCompany(id: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies/delete?',
      companyId = '&id=' + id,
      body = '';

    return this.authHttp.post(crmUrl + companyId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
