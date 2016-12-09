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
export class SettlementService {

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

  getSettlements(page: number) {

    let crmUrl = 'http://crm.unicweb.com.ua/api/settlements/',
          queryString = `?per-page=20&page=${page}`;

    return this.get(crmUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchRegion(query: string) {
    let regionUrl = 'http://crm.unicweb.com.ua/ajax/search/regions',
      regionQuery = `?q=${query}`;
    return this.get(regionUrl + regionQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createSettlement(id = 0, name = '') {
    let body = '&region_id=' + id + '&name=' + name,
          createUrl = 'http://crm.unicweb.com.ua/api/settlements/create';

    return this.post(createUrl, body).map((res: Response) => {
      return [{
        create: res.json()
      }];
    });
  }

  updateSettlement(id = 0, regionId = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/settlements/update',
          updateId = `?id=${id}`,
          body = 'region_id=' + regionId + '&name=' + name;

      return this.post(updateUrl + updateId, body)
        .map((res: Response) => {
          return [{
            update: res.json()
          }];
        });
  }

  deleteSettlement(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/settlements/delete',
          deleteId = `?id=${id}`;

    return this.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }
}
