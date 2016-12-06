import {
  Injectable
} from '@angular/core';

import * as io from 'socket.io-client';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  private url = 'http://crm.unicweb.com.ua:8092';
  private socket;
  token = localStorage.getItem('id_token');

  constructor() {}

  socketMsgs() {
    let observable = new Observable(observer => {
      this.socket = io(this.url, {
        query: 'auth_token=' + this.token
      });
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
