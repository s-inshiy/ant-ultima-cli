import {
  Injectable
} from '@angular/core';
import {
  Response,
  RequestOptionsArgs
} from '@angular/http';
import {
  Router
} from '@angular/router';
import {
  AuthHttp as JwtAuthHttp
} from 'angular2-jwt';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class ServiceService {

  constructor(public authHttp: JwtAuthHttp, private router: Router) {}

  private isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403;
  }

  private authIntercept(response: Observable < Response > ): Observable < Response > {
    let sharableResponse = response.share();
    sharableResponse.subscribe(null, (err) => {
      if (this.isUnauthorized(err.status)) {
        this.router.navigate(['/login']);
      }
    });
    return sharableResponse;
  }

  public get(url: string, options ? : RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.get(url, options));
  }

  public post(url: string, body: any, options ? : RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.post(url, body, options));
  }

  getServices() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/tree';

    return this.get(crmUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  getParentTree() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/plain';

    return this.get(crmUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  getChildrenTree( id: number) {
   let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/child?',
          childrenId = '&id=' + id;

    return this.get(crmUrl + childrenId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchService(query: string) {
    let streetsUrl = 'http://crm.unicweb.com.ua/ajax/search/worktype-categories',
      queryString = '?q=' + query;

    return this.get(streetsUrl + queryString).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createCategory(name = '', parerntId = 0, description = '') {
    let serviceUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/create',
      body = '&name=' + name + '&parent=' + parerntId + '&description=' + description;


    return this.post(serviceUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  createWork(name = '', categoryId = 0, description = '') {
    let serviceUrl = 'http://crm.unicweb.com.ua/api/worktypes/create',
      body = '&name=' + name + '&category_id=' + categoryId + '&description=' + description;

    return this.post(serviceUrl, body)
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

    return this.post(crmUrl + categoryId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteWork(id: number | string = '') {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes/delete?',
      categoryId = 'id=' + id,
      body = '';

    return this.post(crmUrl + categoryId, body)
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

    return this.post(crmUrl + categoryId, body)
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

    return this.post(crmUrl + workId, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
