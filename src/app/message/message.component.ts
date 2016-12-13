import {
  Component,
  OnInit
} from '@angular/core';
import {
  MessageService
} from './message.service';
import {
  Message
} from 'primeng/primeng';
import {
  JwtHelper
} from 'angular2-jwt';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [
    MessageService
  ]
})
export class MessageComponent implements OnInit {

  messages: any[] = [];
  msgs: Message[];
  connection;
  message: Msgs = new NewMsgs();
  pag: Paginate = new NewPaginate();
  users: Search = new SearchUsers();
  dialogMsgs: boolean;
  resCRUD: any;
  jwtHelper: JwtHelper = new JwtHelper();
  show = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.getMsgs(this.pag.curr);
    this.getRole();
  }

  getMsgs(page) {
    this.messageService
      .getMsgs(this.pag.curr)
      .subscribe(
        data => {
          this.messages = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.log(err),
        () => {
          // console.log(this.messages);
        }
      );
  }

  getRole() {
     let token = localStorage.getItem('id_token'),
            role = this.jwtHelper.decodeToken(token).rol;
     if (token) {
       switch (role !== null) {
         case role === 'admin':
          return this.show = true;
        case role === 'manager':
          return this.show = true;
        default:
        return false;
       }
     }
  }

  // Paginate
  paginate(event: any) {
    this.pag.curr = Math.ceil(event.first / 20 + 1);
    this.getMsgs(this.pag.curr);
  }

  showMsgs() {
    this.dialogMsgs = true;
  }

  searchUsers(event: any) {
    this.messageService
      .searchUsers(event.query)
      .subscribe(
        data => {
          this.users.result = data[0].search.results;
        },
        err => console.error(err),
      );
  }

  sentMsgs(id: any, name: any) {
    this.messageService
      .sentMsgs(this.message.id, this.message.text)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.log(err),
        () => {
          // if (this.resCRUD.errors.length < 1) {
            this.msgs = [];
            this.dialogMsgs = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Сообщения отправленно',
              detail: this.message.text
            });
            this.message = new NewMsgs();
            this.users = new SearchUsers();
          }
        // }
      );
  }

}

export interface Paginate {
  count ? : string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ? : string[], public curr = 1) {}
}

export interface Search {
  complete ? : string;
  result ? : string[];
}

class SearchUsers implements Search {
  constructor(public complete ? : string, public result ? : string[]) {}
}

export interface Msgs {
  id ? : any;
  text ? : string;
}

class NewMsgs implements Msgs {
  constructor(id ? : any, text ? : string) {}
}
