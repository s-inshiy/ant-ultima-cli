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
export class BidService {

  constructor(public authHttp: AuthHttp) {}

  createBid(addressId = '', serviceId = '', phone = '', contact = '', description = '') {
    let bidsUrl = 'http://crm.unicweb.com.ua/api/bids/create',
      body = '&address_id=' + addressId + '&service_id=' + serviceId + '&phone=' + encodeURIComponent(phone) + '&contact_person=' +
      contact + '&description=' + description;

    return this.authHttp.post(bidsUrl, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  getBids(page: number, id: any = '', fio: any = '', phone: any = '') {
    let bidsUrl = 'http://crm.unicweb.com.ua/api/bids/',
      queryString = `?per-page=40&page=${page}&id=${id}&fio=${fio}&phone=${phone}`;

    return this.authHttp.get(bidsUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  getBidsMasters(id: any) {
    let masterUrl = 'http://crm.unicweb.com.ua/api/bids/assign-master',
      queryId = `?bid_id=${id}`;

    return this.authHttp.get(masterUrl + queryId).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  addMaster(bid_id: number | string, master_id: number | string, datetime: number | Date) {
    let body = '&bid_id=' + bid_id + '&master_id=' + master_id + '&datetime=' + datetime;

    return this.authHttp.post('http://crm.unicweb.com.ua/api/shedules/create ', body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteBid(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/bids/delete',
      deleteId = `?id=${id}`;

    return this.authHttp.post(deleteUrl + deleteId, '')
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

  searchWork(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/ajax/search/worktype',
      queryString = `?q=${query}`;

    return this.authHttp.get(baseUrl + queryString).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  // Modal Bid

  getAddress() {
    let crmUrl = 'http://crm.unicweb.com.ua/api/addresses';

    return this.authHttp.get(crmUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  searchStreet(query: string) {
    let areaUrl = 'http://crm.unicweb.com.ua/ajax/search/streets',
      areaQuery = `?q=${query}`;

    return this.authHttp.get(areaUrl + areaQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  getPhone() {
    let phoneUrl = 'http://crm.unicweb.com.ua/api/phones';

    return this.authHttp.get(phoneUrl).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

}
