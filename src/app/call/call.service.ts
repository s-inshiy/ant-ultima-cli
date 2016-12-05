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
export class CallService {

  constructor(public authHttp: AuthHttp) {}

  getCalls(page: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/requests',
      callQuery = `?per-page=20&page=${page}`;

    return this.authHttp.get(crmUrl + callQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  deleteCall(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/requests/delete',
      deleteId = `?id=${id}`;

    return this.authHttp.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

}
