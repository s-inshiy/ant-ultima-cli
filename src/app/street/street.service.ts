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
export class StreetService {

  constructor(private http: Http) {}

  getStreets(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/streets',
          queryString = `?per-page=20&page=${page}`,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl + queryString, {headers: headers }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createStreet(id: number = 0, name: string = '') {
    let body = '&area_id=' + id + '&name=' + name,
          headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post('http://crm.unicweb.com.ua/api/streets/create', body, {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteStreet(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/streets/delete',
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

  updateStreet(id: number = 0, areaId: number = 0, name: string = '') {
    let updateUrl = 'http://crm.unicweb.com.ua/api/streets/update',
          updateId = `?id=${id}`,
          body = 'area_id=' + areaId + '&name=' + name,
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

  searchAreas(query: string = '', areasIds: number[] | string = '') {
    let areaUrl = 'http://crm.unicweb.com.ua/ajax/search/areas',
          areaQuery = '?q=' + query + '&not_id=' + areasIds;

    return this.http.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }


}
