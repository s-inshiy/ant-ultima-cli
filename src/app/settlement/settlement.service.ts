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
export class SettlementService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getSettlements(page: number) {

    let crmUrl = 'http://crm.unicweb.com.ua/api/settlements/',
          queryString = `?per-page=20&page=${page}`;

    return this.authHttp.get(crmUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchRegion(query: string) {
    let regionUrl = 'http://crm.unicweb.com.ua/ajax/search/regions',
      regionQuery = `?q=${query}`;
    return this.authHttp.get(regionUrl + regionQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createSettlement(id = 0, name = '') {
    let body = '&region_id=' + id + '&name=' + name,
          createUrl = 'http://crm.unicweb.com.ua/api/settlements/create';

    return this.authHttp.post(createUrl, body).map((res: Response) => {
      return [{
        create: res.json()
      }];
    });
  }

  updateSettlement(id = 0, regionId = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/settlements/update',
          updateId = `?id=${id}`,
          body = 'region_id=' + regionId + '&name=' + name;

      return this.authHttp.post(updateUrl + updateId, body)
        .map((res: Response) => {
          return [{
            update: res.json()
          }];
        });
  }

  deleteSettlement(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/settlements/delete',
          deleteId = `?id=${id}`;

    return this.authHttp.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }
}
