import {
  Injectable
} from '@angular/core';
import {
  Response,
  RequestOptionsArgs
} from '@angular/http';
import {
  Router
} from '@angular/router';
import {
  AuthHttp as JwtAuthHttp
} from 'angular2-jwt';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class CompanyService {

  constructor(public authHttp: JwtAuthHttp, private router: Router) {}

  private isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403;
  }

  private authIntercept(response: Observable < Response > ): Observable < Response > {
    let sharableResponse = response.share();
    sharableResponse.subscribe(null, (err) => {
      if (this.isUnauthorized(err.status)) {
        this.router.navigate(['/login']);
      }
    });
    return sharableResponse;
  }

  public get(url: string, options ? : RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.get(url, options));
  }

  public post(url: string, body: any, options ?: RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.post(url, body, options));
  }

  getCompanies(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies',
      queryString = '?per-page=20&page=' + page;

    return this.get(crmUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createCompany(name = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/companies/create',
           body = '&name=' + name;

    return this.post(crmUrl, body)
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

    return this.post(crmUrl + companyId, body)
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

    return this.post(crmUrl + companyId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
