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
export class BidService {

  constructor(private http: Http) {}

  getBids(page: string, id: any = '', fio: any = '', phone: any = '') {
    let bidsUrl = 'http://crm.unicweb.com.ua/api/bids/',
      queryString = `?per-page=40&page=${page}&id=${id}&fio=${fio}&phone=${phone}`,
      headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9');

    return this.http.get(bidsUrl + queryString).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  addMaster(bid_id: number | string, master_id: number | string, datetime: string) {
    let body = '&bid_id=' + bid_id + '&master_id=' + master_id + '&datetime=' + datetime,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json;q=0.9');

    return this.http.post('http://crm.unicweb.com.ua/api/shedules/create ', body, {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }

  deleteBid(id: number) {
    let deleteUrl = 'http://crm.unicweb.com.ua/api/bids/delete',
      deleteId = `?id=${id}`,
      headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json;q=0.9');
    return this.http.post(deleteUrl + deleteId, '', {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          delete: res.json
        }];
      });
  }

  createClientBid(address_id: any, service_id: any) {
    let createBids = 'http://crm.unicweb.com.ua/api/bids/delete',
      body = 'address_id=' + address_id + 'service_id=' + service_id,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json;q=0.9');

    return this.http.post(createBids, body, {
        headers: headers
      })
      .map((res: Response) => {
        return [{
          json: res.json()
        }];
      });
  }


}
