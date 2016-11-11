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
export class RegionService {

  constructor(private http: Http, public authHttp: AuthHttp) {}

  getRegions(page: number) {

    let crmUrl = 'http://crm.unicweb.com.ua/api/regions',
      queryString = `?per-page=20&page=${page}`;

    return this.authHttp.get(crmUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createRegion(name = '') {
    let body = '&name=' + name,
      createUrl = 'http://crm.unicweb.com.ua/api/regions/create';

    return this.authHttp.post(createUrl, body).map((res: Response) => {
      return [{
        create: res.json()
      }];
    });
  }

  updateRegion(id = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/regions/update',
          updateId = `?id=${id}`,
          body = '&name=' + name;

    return this.authHttp.post(updateUrl + updateId, body)
      .map((res: Response) => {
        return [{
          update: res.json()
        }];
      });
  }

  deleteRegion(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/regions/delete',
      deleteId = `?id=${id}`;

    return this.authHttp.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

}
