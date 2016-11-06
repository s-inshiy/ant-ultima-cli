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
export class AreaService {

  constructor(private http: Http) {}

  getAreas(page: number) {
    let areasUrl = 'http://crm.unicweb.com.ua/api/areas',
          areasQuery = `?per-page=20&page=${page}`,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(areasUrl + areasQuery, {headers: headers }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchSettlement(query: string) {
    let settlementUrl = 'http://crm.unicweb.com.ua/ajax/search/settlements',
      settlementQuery = `?q=${query}`;
    return this.http.get(settlementUrl + settlementQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createArea(id = 0, name = '') {
    let body = '&settlement_id=' + id + '&name=' + name,
          createUrl = 'http://crm.unicweb.com.ua/api/areas/create',
          headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(createUrl, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        create: res.json()
      }];
    });
  }

  deleteArea(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/areas/delete',
      deleteId = `?id=${id}`,
      headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(deleteUrl + deleteId, '', {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

  updateArea(id = 0, settlementId = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/areas/update',
          updateId = `?id=${id}`,
          body = 'settlement_id=' + settlementId + '&name=' + name,
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

}
