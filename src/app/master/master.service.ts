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
export class MasterService {

  constructor(private http: Http) {}

  getMasters(count: number) {
    let crmUrl = 'http://crm.unicweb.com.ua/api/masters',
          page = '?per-page=20&page=' + count,
          headers = new Headers();
          headers.append('Accept', 'application/json;q=0.9');

          return this.http.get(crmUrl + page).map((res: Response) => {
            return [{
              json: res.json()
            }];
          });
  }

}
