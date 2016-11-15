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
export class MasterScheduleService {

  constructor( public authHttp: AuthHttp) {}

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
