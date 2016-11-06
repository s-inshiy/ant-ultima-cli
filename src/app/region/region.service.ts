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
export class RegionService {

  constructor(private http: Http) {}

  getRegions(page: number) {

    let crmUrl = 'http://crm.unicweb.com.ua/api/regions',
      queryString = `?per-page=20&page=${page}`,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl + queryString, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createRegion(name = '') {
    let body = '&name=' + name,
      createUrl = 'http://crm.unicweb.com.ua/api/regions/create',
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

  updateRegion(id = 0, name = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/regions/update',
          updateId = `?id=${id}`,
          body = '&name=' + name,
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

  deleteRegion(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/regions/delete',
      deleteId = `?id=${id}`,
      headers = new Headers();

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
