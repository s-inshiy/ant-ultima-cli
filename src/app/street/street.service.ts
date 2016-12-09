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
export class StreetService {

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

  public post(url: string, body: any, options ?: RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.post(url, body, options));
  }

  getStreets(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/streets',
      queryString = `?per-page=20&page=${page}`;

    return this.get(crmUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createStreet(id = 0, name = '') {
    let body = '&area_id=' + id + '&name=' + name;

    return this.post('http://crm.unicweb.com.ua/api/streets/create', body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteStreet(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/streets/delete',
      deleteId = `?id=${id}`;

    return this.post(deleteUrl + deleteId, '')
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

    return this.post(updateUrl + updateId, body)
      .map((res: Response) => {
        return [{
          update: res.json()
        }];
      });

  }

  searchAreas(query = '', areasIds: number[] | string = '') {
    let areaUrl = 'http://crm.unicweb.com.ua/ajax/search/areas',
      areaQuery = '?q=' + query + '&not_id=' + areasIds;

    return this.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

}
