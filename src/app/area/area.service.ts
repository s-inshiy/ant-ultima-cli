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
export class AreaService {

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

  public get(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.get(url, options));
  }

  public post(url: string, body: any, options ?: RequestOptionsArgs): Observable < Response > {
    return this.authIntercept(this.authHttp.post(url, body, options));
  }


  getAreas(page: number) {
    let areasUrl = 'http://crm.unicweb.com.ua/api/areas',
      areasQuery = `?per-page=20&page=${page}`;

    return this.get(areasUrl + areasQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchSettlement(query: string) {
    let settlementUrl = 'http://crm.unicweb.com.ua/ajax/search/settlements',
      settlementQuery = `?q=${query}`;
    return this.get(settlementUrl + settlementQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  createArea(id = 0, name = '') {
    let body = '&settlement_id=' + id + '&name=' + name,
      createUrl = 'http://crm.unicweb.com.ua/api/areas/create';

    return this.post(createUrl, body).map((res: Response) => {
      return [{
        create: res.json()
      }];
    });
  }

  deleteArea(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/areas/delete',
      deleteId = `?id=${id}`;

    return this.post(deleteUrl + deleteId, '')
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

    return this.post(updateUrl + updateId, body)
      .map((res: Response) => {
        return [{
          update: res.json()
        }];
      });
  }

}
