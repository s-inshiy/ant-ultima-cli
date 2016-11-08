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
export class ServiceService {

  constructor(private http: Http) {}

  getServices() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/tree',
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(crmUrl, {headers: headers}).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchService(query: string) {
    let streetsUrl = 'http://crm.unicweb.com.ua/ajax/search/worktype-categories',
      queryString = '?q=' + query;

    return this.http.get(streetsUrl + queryString).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createCategory(name = '', parerntId = 0, description = '') {
    let serviceUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/create',
      body = '&name=' + name + '&parent=' + parerntId + '&description=' + description,
      headers = new Headers();
      headers.append('Accept', 'application/json;q=0.9');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(serviceUrl, body, { headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  createWork(name = '', categoryId = 0, description = '') {
    let serviceUrl = 'http://crm.unicweb.com.ua/api/worktypes/create',
          body = '&name=' + name + '&category_id=' + categoryId + '&description=' + description,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(serviceUrl, body, {headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteCategory(id: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/delete?',
          categoryId = 'id=' + id,
          body = '',
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(crmUrl + categoryId, body, { headers: headers})
    .map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteWork(id: number | string = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes/delete?',
          categoryId = 'id=' + id,
          body = '',
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(crmUrl + categoryId, body, { headers: headers})
    .map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateCategory(id = 0, name = '', description = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/update?',
          categoryId = 'id=' + id,
          body = '&name=' + name + '&description=' + description,
          headers = new Headers;
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(crmUrl + categoryId, body, { headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  updateWork(id = 0, name = '', description = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes/update?',
          workId = 'id=' + id,
          body = '&name=' + name + '&description=' + description,
          headers = new Headers;
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(crmUrl + workId, body, {headers: headers})
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
