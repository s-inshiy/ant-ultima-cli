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
export class LandingService {

  constructor(public authHttp: AuthHttp) {}

  getServices() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/worktypes-categories/tree';

    return this.authHttp.get(crmUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

}
