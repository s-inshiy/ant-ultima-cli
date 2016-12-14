import {
  Component,
  OnInit
} from '@angular/core';
import {
  BinotelService
} from './binotel.service';
import {
  Message,
  MenuItem,
  // SelectItem
} from 'primeng/primeng';

@Component({
  selector: 'app-binotel',
  templateUrl: './binotel.component.html',
  providers: [
    BinotelService
  ]
})
export class BinotelComponent implements OnInit {

  calls: any;
  dialog: boolean;
  resCRUD: any;
  pag: Paginate = new NewPaginate();
  id: any;
  msgs: Message[];
  tieredItems: MenuItem[];

  constructor(private binotelService: BinotelService) {}

  getBinotelCalls(page: number) {
    this.binotelService
      .getBinotelCalls(this.pag.curr)
      .subscribe(
        data => {
          this.calls = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.error(err),
        // () => console.log(this.items)
      );
  }

  // Paginate
  paginate(event: any) {
    this.pag.curr = Math.ceil(event.first / 20 + 1);
    this.getBinotelCalls(this.pag.curr);
  }

  onRowSelect(event: any) {
    this.id = event.data.id;
  }

  onRowUnselect($event) {
    this.id = null;
  }

    deleteCall(id: number) {
    this.binotelService
      .deleteCall(this.id)
      .subscribe(
        data => {
          this.resCRUD = data[0];
        },
        err => console.error(err),
        () => {
          this.getBinotelCalls(this.pag.curr);
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Звонок удалён',
            detail: this.id
          });
        }
      );
  }

  ngOnInit() {
    this.getBinotelCalls(this.pag.curr);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteCall(this.id)
    }];
  }

}

export interface Paginate {
  count ? : string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ? : string[], public curr = 1) {}
}


