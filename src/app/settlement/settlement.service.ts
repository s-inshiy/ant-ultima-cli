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
export class SettlementService {

  constructor(private http: Http) {}

  getSettlements(page: number) {

    let crmUrl = 'http://crm.unicweb.com.ua/api/settlements/',
          queryString = `?per-page=20&page=${page}`,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl + queryString, {headers: headers }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchRegion(query: string) {
    let regionUrl = 'http://crm.unicweb.com.ua/ajax/search/regions',
      regionQuery = `?q=${query}`;
    return this.http.get(regionUrl + regionQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createSettlement(id = 0, name = '') {
    let body = '&region_id=' + id + '&name=' + name,
          createUrl = 'http://crm.unicweb.com.ua/api/settlements/create',
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(createUrl, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        create: res.json()
      }];
    });
  }

  updateSettlement(id = 0, regionId = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/settlements/update',
          updateId = `?id=${id}`,
          body = 'region_id=' + regionId + '&name=' + name,
          headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json;q=0.9');

      return this.http.post(updateUrl + updateId, body, {
          headers: headers
        })
        .map((res: Response) => {
          return [{
            update: res.json()
          }];
        });
  }

  deleteSettlement(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/settlements/delete',
          deleteId = `?id=${id}`,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(deleteUrl + deleteId, '', {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }
}
