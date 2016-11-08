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
export class CompanyService {

  constructor(private http: Http) {}

  getCompanies(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies',
      queryString = '?per-page=20&page=' + page,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl + queryString, {headers : headers}).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createCompany(name = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies/create',
      body = '&name=' + name,
      headers = new Headers();
      headers.append('Accept', 'application/json;q=0.9');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      return this.http.post(crmUrl, body, { headers: headers})
        .map((res: Response) => {
          return [{
            json: res.json()
          }];
        });
  }

  updateCompany(id = 0, name = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies/update?',
      companyId = '&id=' + id,
      body = '&name=' + name,
      headers = new Headers;
      headers.append('Accept', 'application/json;q=0.9');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(crmUrl + companyId, body, {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteCompany(id: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies/delete?',
          companyId = '&id=' + id,
          body = '',
          headers = new Headers;
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(crmUrl + companyId, body, {headers : headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
