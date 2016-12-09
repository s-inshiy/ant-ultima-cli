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
export class MasterDetailService {

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

  getMasterDetail(id: number | string) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/view?',
      masterId = '&id=' + id;

    return this.get(_baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  addMasterArea(masterId: number | string = '', areaId: number | string = '') {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/add-area?',
      body = '&master_id=' + masterId + '&area_id=' + areaId;

    return this.post(_baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  getMasterAreas(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/areas?',
      masterId = '&id=' + id;

    return this.get(baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchMasterAreas(query = '', areasIds: number[] | string = '') {
    let areaUrl = 'http://crm.unicweb.com.ua/api/areas?',
      areaQuery = '&name=' + query + '&not_id=' + areasIds;

    return this.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }



  deleteMasterArea(id: number | string = '', masterId: number | string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/remove-area?',
      areaId = '&area_id=' + id + '&master_id=' + masterId;

    return this.get(baseUrl + areaId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }


  getMasterServices(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/services?',
      masterId = '&id=' + id;

    return this.get(baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchService(query: string) {
    let streetsUrl = 'http://crm.unicweb.com.ua/ajax/search/worktype',
      streetsQuery = '?q=' + query;

    return this.get(streetsUrl + streetsQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  addMasterService(masterId: number | string = '', serviceId: number | string = '', price: number | string = '') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/add-service?',
      body = '&master_id=' + masterId + '&service_id=' + serviceId + '&price=' + price;

    return this.post(baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteMasterService(id: number | string = '', masterId: number | string = '') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/remove-service?',
      serviceId = '&service_id=' + id + '&master_id=' + masterId;

    return this.get(baseUrl + serviceId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  // Master Schedule

    getMasterSchedule(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules?',
      masterId = 'master_id=' + id;

    return this.get(baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateEventTime(id: number, datetime: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules/move-to-time?',
      eventId = '&id=' + id,
      body = '&time=' + datetime;

    return this.post(baseUrl + eventId, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateEventDuration(id: number | string, eventDuration: number | string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules/resize?',
      eventId = '&id=' + id,
      body = '&duration=' + eventDuration;

    return this.post(baseUrl + eventId, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  detailEvent(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules/view?',
      eventId = '&id=' + id;

    return this.get(baseUrl + eventId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

}
