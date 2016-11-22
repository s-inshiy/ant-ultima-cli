import {
  Injectable
} from '@angular/core';

import {
  Response
} from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import {
  AuthHttp
} from 'angular2-jwt';


@Injectable()
export class MasterTaskService {

  constructor(public authHttp: AuthHttp) {}

  getTasks(page: number) {
    let tasksUrl = 'http://crm.unicweb.com.ua/api/shedules',
      areasQuery = `?per-page=20&page=${page}`;

    return this.authHttp.get(tasksUrl + areasQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  setMasDone(taskId: number) {
    let tasksUrl = 'http://crm.unicweb.com.ua/api/shedules/pending?',
      id = 'id=' + taskId;

    return this.authHttp.get(tasksUrl + id).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });

  }

    setManDone(taskId: number) {
    let tasksUrl = 'http://crm.unicweb.com.ua/api/shedules/done?',
      id = 'id=' + taskId;

    return this.authHttp.get(tasksUrl + id).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }


}
