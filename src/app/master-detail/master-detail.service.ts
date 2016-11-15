import {
  Injectable
} from '@angular/core';
import {
  Response,
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import {
  AuthHttp
} from 'angular2-jwt';


@Injectable()
export class MasterDetailService {

  constructor(public authHttp: AuthHttp) {}

  getMasterDetail(id: number | string) {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/view?',
      masterId = '&id=' + id;

    return this.authHttp.get(_baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  addMasterArea(masterId: number | string = '', areaId: number | string = '') {
    let _baseUrl = 'http://crm.unicweb.com.ua/api/masters/add-area?',
      body = '&master_id=' + masterId + '&area_id=' + areaId;

    return this.authHttp.post(_baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  getMasterAreas(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/areas?',
      masterId = '&id=' + id;

    return this.authHttp.get(baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchMasterAreas(query = '', areasIds: number[] | string = '') {
    let areaUrl = 'http://crm.unicweb.com.ua/api/areas?',
      areaQuery = '&name=' + query + '&not_id=' + areasIds;

    return this.authHttp.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }



  deleteMasterArea(id: number | string = '', masterId: number | string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/remove-area?',
      areaId = '&area_id=' + id + '&master_id=' + masterId;

    return this.authHttp.get(baseUrl + areaId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }


  getMasterServices(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/services?',
      masterId = '&id=' + id;

    return this.authHttp.get(baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchService(query: string) {
    let streetsUrl = 'http://crm.unicweb.com.ua/ajax/search/worktype',
      streetsQuery = '?q=' + query;

    return this.authHttp.get(streetsUrl + streetsQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  addMasterService(masterId: number | string = '', serviceId: number | string = '', price: number | string = '') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/add-service?',
      body = '&master_id=' + masterId + '&service_id=' + serviceId + '&price=' + price;

    return this.authHttp.post(baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteMasterService(id: number | string = '', masterId: number | string = '') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/masters/remove-service?',
      serviceId = '&service_id=' + id + '&master_id=' + masterId;

    return this.authHttp.get(baseUrl + serviceId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  // Master Schedule

    getMasterSchedule(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules?',
      masterId = 'master_id=' + id;

    return this.authHttp.get(baseUrl + masterId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateEventTime(id: number, datetime: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules/move-to-time?',
      eventId = '&id=' + id,
      body = '&time=' + datetime;

    return this.authHttp.post(baseUrl + eventId, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  updateEventDuration(id: number | string, eventDuration: number | string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules/resize?',
      eventId = '&id=' + id,
      body = '&duration=' + eventDuration;

    return this.authHttp.post(baseUrl + eventId, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  detailEvent(id: number) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/shedules/view?',
      eventId = '&id=' + id;

    return this.authHttp.get(baseUrl + eventId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

}
