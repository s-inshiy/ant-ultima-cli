import {
  Injectable
} from '@angular/core';
import {
  Response,
} from '@angular/http';
import {
  AuthHttp
} from 'angular2-jwt';

@Injectable()
export class ClientBidService {

  constructor( public authHttp: AuthHttp) {}

  getBids() {
    let bidsUrl = 'http://crm.unicweb.com.ua/api/bids';

    return this.authHttp.get(bidsUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

}
