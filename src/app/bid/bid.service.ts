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

  createClientBid(address_id: any, service_id: any) {
    let createBids = 'http://crm.unicweb.com.ua/api/bids/delete',
      body = 'address_id=' + address_id + 'service_id=' + service_id;

    return this.authHttp.post(createBids, body)
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

}
