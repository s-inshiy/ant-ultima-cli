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

  constructor(public authHttp: AuthHttp) {}

  getBids() {
    let bidsUrl = 'http://crm.unicweb.com.ua/api/bids';

    return this.authHttp.get(bidsUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  createBid(address_id = '', service_id = '', phone = '', contact_person = '', description = '') {
    let bidsUrl = 'http://crm.unicweb.com.ua/api/bids/create',
      body = '&address_id=' + address_id + '&service_id=' + service_id + '&phone=' + encodeURIComponent(phone) + '&contact_person=' +
      contact_person + '&description=' + description;

    return this.authHttp.post(bidsUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
