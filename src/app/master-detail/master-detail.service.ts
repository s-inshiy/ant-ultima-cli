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
export class MasterDetailService {

  constructor(private http: Http) {}

  getlMasterDetail(id: number | string) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/view?',
      masterId = '&id=' + id;

    return this.http.get(_baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  addMasterArea(masterId: number | string = '', areaId: number | string = '') {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/add-area?',
      body = '&master_id=' + masterId + '&area_id=' + areaId,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(_baseUrl, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteMasterArea(id: number | string = '', masterId: number | string) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/remove-area?',
      areaId = '&area_id=' + id + '&master_id=' + masterId;

    return this.http.get(_baseUrl + areaId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  addMasterService(masterId: number | string = '', serviceId: number | string = '', price: number | string = '') {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/add-service?',
      body = '&master_id=' + masterId + '&service_id=' + serviceId + '&price=' + price,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(_baseUrl, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteMasterService(id: number | string = '', masterId: number | string = '') {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/remove-service?',
      serviceId = '&service_id=' + id + '&master_id=' + masterId;

    return this.http.get(_baseUrl + serviceId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  getMasterSchedule(id: number) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/shedules?',
      masterId = 'master_id=' + id;

    return this.http.get(_baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateEventTime(id: number, datetime: string) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/shedules/move-to-time?',
      eventId = '&id=' + id,
      body = '&time=' + datetime,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(_baseUrl + eventId, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateEventDuration(id: number | string, eventDuration: number | string) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/shedules/resize?',
      eventId = '&id=' + id,
      body = '&duration=' + eventDuration,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(_baseUrl + eventId, body, {
      headers: headers
    }).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  detailEvent(id: number) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/shedules/view?',
      eventId = '&id=' + id;

    return this.http.get(_baseUrl + eventId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

}
