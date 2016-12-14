import {
  Component,
  OnInit
} from '@angular/core';
import {
  StreetService
} from './street.service';
import {
  LoginService
} from '../login/login.service';
import {
  Message,
  MenuItem
} from 'primeng/primeng';

@Component({
  selector: 'app-street',
  providers: [
    StreetService, LoginService
  ],
  templateUrl: './street.component.html'
})

export class StreetComponent implements OnInit {

  // Classes
  search: Search = new SearchAreas();
  street: Street = new NewStreet();
  pag: Paginate = new NewPaginate();
  // PrimeNG
  items: any;
  msgs: Message[];
  tieredItems: MenuItem[];
  dialog: boolean;
  resCRUD: any;

  constructor(private streetService: StreetService) {}

  ngOnInit() {
    this.getStreets(this.pag.curr);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteStreet(this.street.id, this.street.name)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];

  }

  getStreets(page: number) {
    this.streetService
      .getStreets(page)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.error(err),
        // () => console.log(this.items)
      );
  }

  // Paginate
  paginate(event: any) {
    this.pag.curr = Math.ceil(event.first / 20 + 1);
    this.getStreets(this.pag.curr);
  }

  showDialog() {
    this.dialog = true;
    this.street.area = null;
  }

  onRowSelect(event: any) {
    this.street.id = event.data.id;
    this.street.name = event.data.name;
    console.log(this.street);
  }

  onRowUnselect($event) {
    this.street = new NewStreet();
  }

  // CRUD Streets
  createStreet(id: number, name: string) {
    this.streetService.createStreet(this.street.area, this.street.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getStreets(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Улица создана',
              detail: this.street.name
            });
            this.street = new NewStreet();
            this.search = new SearchAreas();
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

  searchAreas(event: any) {
    this.streetService
      .searchAreas(event.query)
      .subscribe(
        data => {
          this.search.result = data[0].search.results;
          // console.log(this.results);
        },
        err => console.error(err),
        // () => console.log(this.search.result)
      );
  }

  deleteStreet(id: any, street: any) {
    this.streetService
      .deleteStreet(this.street.id)
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
            detail: this.street.name
          });
          this.getStreets(this.pag.curr);
          this.dialog = false;
        }
      );
  }

  updateStreet(id: number, settlementId: number, name: string) {
    this.streetService
      .updateStreet(this.street.id, this.street.area, this.street.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].update;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getStreets(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Улица обновлена',
              detail: this.street.name
            });
            this.street = new NewStreet();
            this.search = new SearchAreas();
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

}

export interface Street {
  id ?: any;
  name?: any;
  area ?: any;
  settlement ?: any;
  region ?: any;
}

class NewStreet implements Street {
  constructor(public id ?: any, public name ?: any , public area ?: any,
    public settlement ?: any, public region ?: any) {}
}

export interface Search {
  complete ?: string;
  result ?: string[];
}

class SearchAreas implements Search {
  constructor(public complete ?: string, public result ?: string[]) {}
}

export interface Paginate {
    count?: string[];
    curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count?: string[], public curr = 1) {}
}
