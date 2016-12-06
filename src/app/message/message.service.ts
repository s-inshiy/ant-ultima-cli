import {
  Injectable
} from '@angular/core';

import {
  Response
} from '@angular/http';

// import {
//   Observable
// } from 'rxjs/Observable';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/map';

import {
  AuthHttp
} from 'angular2-jwt';

// import * as io from 'socket.io-client';

@Injectable()
export class MessageService {

  // private url = 'http://crm.unicweb.com.ua:8092';
  // private socket;

  token = localStorage.getItem('id_token');

  constructor(public authHttp: AuthHttp) {}

  getMsgs(page) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/messages',
      msgsQuery = `?per-page=20&page=${page}`;

    return this.authHttp.get(baseUrl + msgsQuery).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });
  }

  // socketMsgs() {
  //   let observable = new Observable(observer => {
  //     this.socket = io(this.url, {
  //       query: 'auth_token=' + this.token
  //     });
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }

  searchUsers(query: string) {
    let baseUrl = 'http://crm.unicweb.com.ua/api/users/search/',
      userQuery = `?q=${query}`;
    return this.authHttp.get(baseUrl + userQuery).map((res: Response) => {
      return [{
        search: res.json()
      }];
    });
  }

  sentMsgs(id = '', text = '') {
    let baseUrl = 'http://crm.unicweb.com.ua/api/messages/write',
      body = '&user_id=' + id + '&text=' + text;

    return this.authHttp.post(baseUrl, body).map((res: Response) => {
      return [{
        json: res.json()
      }];
    });

  }


}
