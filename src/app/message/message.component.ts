import {
  Component,
  OnInit
} from '@angular/core';

import {
  MessageService
} from './message.service';

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
  msgs: any[] = [];
  connection;
  message: Msgs = new NewMsgs();
  pag: Paginate = new NewPaginate();
  users: Search = new SearchUsers();
  dialogMsgs: boolean;
  resCRUD: any;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.socketMsgs();
    this.getMsgs(this.pag.curr);
  }

  getMsgs(page) {
    this.messageService
      .getMsgs(this.pag.curr)
      .subscribe(
        data => {
          this.messages = data[0].json.data;
        },
        err => console.log(err),
        () => {
          console.log(this.messages);
        }
      );
  }

  socketMsgs() {
    this.messageService
      .socketMsgs().subscribe(message => {
        this.msgs.push({
          severity: 'info',
          summary: message[0].sender,
          detail: message[0].text
        });
        // console.log(message);
      });
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
          this.message = new NewMsgs();
          this.dialogMsgs = false;
        }
      );
  }

}

export interface Paginate {
  count ?: string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ?: string[], public curr = 1) {}
}

export interface Search {
  complete ?: string;
  result ?: string[];
}

class SearchUsers implements Search {
  constructor(public complete ?: string, public result ?: string[]) {}
}

export interface Msgs {
  id ?: any;
  text ?: string;
}

class NewMsgs implements Msgs {
  constructor( id ?: any, text ?: string) {}
}
