import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class StreetService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getStreets(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/streets',
          queryString = `?per-page=20&page=${page}`;

      return this.authHttp.get(crmUrl + queryString).map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  createStreet(id = 0, name = '') {
    let body = '&area_id=' + id + '&name=' + name;

    return this.authHttp.post('http://crm.unicweb.com.ua/api/streets/create', body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteStreet(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/streets/delete',
          deleteId = `?id=${id}`;

    return this.authHttp.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });

  }

  updateStreet(id = 0, areaId = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/streets/update',
          updateId = `?id=${id}`,
          body = 'area_id=' + areaId + '&name=' + name;

    return this.authHttp.post(updateUrl + updateId, body)
      .map((res: Response) => {
        return [{
          update: res.json()
        }];
      });

  }

  searchAreas(query = '', areasIds: number[] | string = '') {
    let areaUrl = 'http://crm.unicweb.com.ua/ajax/search/areas',
      areaQuery = '?q=' + query + '&not_id=' + areasIds;

    return this.authHttp.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

}
