import {
  Component,
  OnInit
} from '@angular/core';
import {
  SettlementService
} from './settlement.service';

import {
  DataTable,
  Column,
  InputText,
  Growl,
  Message,
  // ContextMenu,
  ContextMenuModule,
  MenuItem,
  Paginator,
  // Dialog,
  DialogModule,
  Button,
  Header,
  Footer,
  AutoComplete,
  SelectItem,
  Dropdown
} from 'primeng/primeng';

@Component({
  selector: 'an-settlement',
  providers: [
    SettlementService
  ],
  templateUrl: './settlement.component.html'
})

export class SettlementComponent implements OnInit {

  // PrimeNG
  items: any[];
  msgs: Message[];
  tieredItems: MenuItem[];
  // Dialog
  dialog: boolean;
  // Classes
  settlement: Settlement = new NewSettlement();
  search: Search = new SearchRegion();
  pag: Paginate = new NewPaginate();
  // Response
  resCRUD: any;

  constructor(private settlementService: SettlementService) {}

  ngOnInit() {
    this.getSettlements(this.pag.curr);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteSettlement(this.settlement.id, this.settlement.name)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
  }

  getSettlements(page: number) {
    this.settlementService
      .getSettlements(this.pag.curr)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.log(err),
        // () => console.log('Areas')
      );
  }

  // Paginate
  paginate(event: any) {
    this.pag.curr = Math.ceil(event.first / 20 + 1);
    this.getSettlements(this.pag.curr);
  }

  showDialog() {
    this.dialog = true;
  }

  onRowSelect(event: any) {
    this.settlement.id = event.data.id;
    this.settlement.name = event.data.name;
    this.settlement.region = event.data.region;
    // console.log(this.settlement);
  }

  onRowUnselect($event) {
    this.settlement = new NewSettlement();
  }

  searchRegion(event: any) {
    this.settlementService
      .searchRegion(event.query)
      .subscribe(
        data => {
          this.search.result = data[0].search.results;
        },
        err => console.error(err),
      );
  }

  createSettlement(id: any, name: any) {
    this.settlementService
      .createSettlement(this.settlement.region, this.settlement.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].create;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getSettlements(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Нас. пункт создан',
              detail: this.settlement.name
            });
            this.settlement = new NewSettlement();
            this.search = new SearchRegion();
          }
          for (let i = 0; i < this.resCRUD.errors.length; i++) {
            this.msgs.push({
              severity: 'error',
              summary: 'Ошибка',
              detail: this.resCRUD.errors[i]
            });
          }
        }
      );
  }

    updateStreet(id: number, settlementId: number, name: string) {
    this.settlementService
      .updateSettlement(this.settlement.id, this.settlement.region, this.settlement.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].update;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getSettlements(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Улица обновлена',
              detail: this.settlement.name
            });
            this.settlement = new NewSettlement();
            this.search = new SearchRegion();
          }
          for (let i = 0; i < this.resCRUD.errors.length; i++) {
            this.msgs.push({
              severity: 'error',
              summary: 'Ошибка',
              detail: this.resCRUD.errors[i]
            });
          }
        }
      );
  }

  deleteSettlement(id: any, street: any) {
    this.settlementService
      .deleteSettlement(this.settlement.id)
      .subscribe(
        data => {
          this.resCRUD = data;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'error',
            summary: 'Улица удалена',
            detail: this.settlement.name
          });
          this.getSettlements(this.pag.curr);
          this.dialog = false;
        }
      );

  }
}

export interface Settlement {
  id ?: any;
  name ?: any;
  region ?: any;
}

class NewSettlement implements Settlement {
  constructor(public id ?: any, public name ?: any, public region ?: any) {}
}

export interface Search {
  complete ?: string;
  result ?: string[];
}

class SearchRegion implements Search {
  constructor(public complete ?: string, public result ?: string[]) {}
}

export interface Paginate {
  count ?: string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ?: string[], public curr: number = 1) {}
}
