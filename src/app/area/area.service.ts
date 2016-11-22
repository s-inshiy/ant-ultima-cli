import {
  Injectable
} from '@angular/core';
import {
  Response
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import {
  AuthHttp
} from 'angular2-jwt';

@Injectable()
export class AreaService {

  constructor( public authHttp: AuthHttp) {}

  getAreas(page: number) {
    let areasUrl = 'http://crm.unicweb.com.ua/api/areas',
      areasQuery = `?per-page=20&page=${page}`;

    return this.authHttp.get(areasUrl + areasQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchSettlement(query: string) {
    let settlementUrl = 'http://crm.unicweb.com.ua/ajax/search/settlements',
      settlementQuery = `?q=${query}`;
    return this.authHttp.get(settlementUrl + settlementQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createArea(id = 0, name = '') {
    let body = '&settlement_id=' + id + '&name=' + name,
      createUrl = 'http://crm.unicweb.com.ua/api/areas/create';

    return this.authHttp.post(createUrl, body).map((res: Response) => {
      return [{
        create: res.json()
      }];
    });
  }

  deleteArea(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/areas/delete',
      deleteId = `?id=${id}`;

    return this.authHttp.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

  updateArea(id = 0, settlementId = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/areas/update',
      updateId = `?id=${id}`,
      body = 'settlement_id=' + settlementId + '&name=' + name;

    return this.authHttp.post(updateUrl + updateId, body)
      .map((res: Response) => {
        return [{
          update: res.json()
        }];
      });
  }

}
