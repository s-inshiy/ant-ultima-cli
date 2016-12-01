import {
  Injectable
} from '@angular/core';
import {
  Response,
  Headers
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import {
  AuthHttp
} from 'angular2-jwt';

@Injectable()
export class ServiceService {

  constructor( public authHttp: AuthHttp) {}

  getServices() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/tree';

    return this.authHttp.get(crmUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchService(query: string) {
    let streetsUrl = 'http://crm.unicweb.com.ua/ajax/search/worktype-categories',
      queryString = '?q=' + query;

    return this.authHttp.get(streetsUrl + queryString).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createCategory(name = '', parerntId = 0, description = '') {
    let serviceUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/create',
      body = '&name=' + name + '&parent=' + parerntId + '&description=' + description;


    return this.authHttp.post(serviceUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  createWork(name = '', categoryId = 0, description = '') {
    let serviceUrl = 'http://crm.unicweb.com.ua/api/worktypes/create',
          body = '&name=' + name + '&category_id=' + categoryId + '&description=' + description;

    return this.authHttp.post(serviceUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteCategory(id: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/delete?',
          categoryId = 'id=' + id,
          body = '';

    return this.authHttp.post(crmUrl + categoryId, body)
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

    return this.authHttp.post(crmUrl + categoryId, body, { headers: headers})
    .map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateCategory(id = 0, name = '', description = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/update?',
          categoryId = 'id=' + id,
          body = '&name=' + name + '&description=' + description;

    return this.authHttp.post(crmUrl + categoryId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  updateWork(id = 0, name = '', description = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes/update?',
          workId = 'id=' + id,
          body = '&name=' + name + '&description=' + description;

    return this.authHttp.post(crmUrl + workId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
