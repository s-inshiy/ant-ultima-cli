import {
  Component,
  OnInit
} from '@angular/core';

import {
  CallService
} from './call.service';

import {
  Message,
  MenuItem,
} from 'primeng/primeng';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
  viewProviders: [
    CallService
  ]
})
export class CallComponent implements OnInit {

  pag: Paginate = new NewPaginate();
  msgs: Message[];
  tieredItems: MenuItem[];
  calls: any[];
  call: Call = new NewCall();
  resCRUD: any;

  constructor(private CallService: CallService) {}

  ngOnInit() {
    this.getCalls(this.pag.curr);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteCall(this.call.id)
    }]
  }

  getCalls(page: number) {
    this.CallService
      .getCalls(this.pag.curr)
      .subscribe(
        data => {
          this.calls = data[0].json.data;
        },
        err => console.log(err),
        // () => {}
      );
  }

  onRowSelect(event) {
    this.call.id = event.data.id;
    this.call.phone = event.data.phone;
  }

  deleteCall(id: any) {
    this.CallService
      .deleteCall(this.call.id)
      .subscribe(
        data => {
          this.resCRUD = data;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'warn',
            summary: 'Запрос на звонок удалён',
            detail: this.call.phone
          });
          this.call = new NewCall();
          this.getCalls(this.pag.curr);
        }
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

export interface Call {
  id ? : number;
  phone ? : any;
  email ? : any;
  service ? : any;
  date ? : any;
}

class NewCall implements Call {
  constructor(id ? : number, phone ? : any, email ? : any, service ? : any, date ? : any) {}
}
