import {
  Component,
  OnInit
} from '@angular/core';
import {
  AreaService
} from './area.service';

import {
  Message,
  MenuItem,
} from 'primeng/components/common/api';

@Component({
  selector: 'app-area',
  providers: [
    AreaService
  ],
  templateUrl: './area.component.html'
})

export class AreaComponent implements OnInit {

  // Classes
  area: Area = new NewArea();
  search: Search = new SearchAreas();
  pag: Paginate = new NewPaginate();

  // PrimeNG
  items: any[];
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;

  constructor(private areaService: AreaService) {}

  ngOnInit() {
    this.getAreas(this.pag.curr);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteArea(this.area.id, this.area.name)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
  }

  getAreas(page: number) {
    this.areaService
      .getAreas(this.pag.curr)
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
    this.getAreas(this.pag.curr);
  }

  showDialog() {
    this.dialog = true;
    this.area.settlement = null;
  }

  onRowSelect(event: any) {
    this.area.id = event.data.id;
    this.area.name = event.data.name;
    this.area.settlement = event.data.settlement;
    // console.log(this.area);
  }

  onRowUnselect($event) {
    this.area = new NewArea();
  }

  searchSettlement(event: any) {
    this.areaService
      .searchSettlement(event.query)
      .subscribe(
        data => {
          this.search.result = data[0].search.results;
        },
        err => console.error(err),
      );
  }

  createArea(id: any, name: any) {
    this.areaService
      .createArea(this.area.settlement, this.area.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].create;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getAreas(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Нас. пункт создан',
              detail: this.area.name
            });
            this.area = new NewArea();
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

  updateArea(id: any, settlementId: any, name: string) {
    this.areaService
      .updateArea(this.area.id, this.area.settlement, this.area.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].update;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getAreas(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Нас. пункт обновлён',
              detail: this.area.name
            });
            this.area = new NewArea();
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

  deleteArea(id: any, street: any) {
    this.areaService
      .deleteArea(this.area.id)
      .subscribe(
        data => {
          this.resCRUD = data;
        },
        err => console.log(err),
        () => {
          // console.log(this.area.id);
          this.msgs = [];
          this.msgs.push({
            severity: 'warn',
            summary: 'Нас. пункт удалён',
            detail: this.area.name
          });
          this.area = new NewArea();
          this.dialog = false;
          this.getAreas(this.pag.curr);
        }
      );

  }

}

export interface Area {
  id ?: any;
  name ?: any;
  settlement ?: any;
}

class NewArea implements Area {
  constructor(public id ?: any, public name ?: any,
    public settlement ?: any) {}
}

export interface Search {
  complete ?: string;
  result ?: string[];
}

class SearchAreas implements Search {
  constructor(public complete ?: string, public result ?: string[]) {}
}

export interface Paginate {
  count ?: string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ?: string[], public curr = 1) {}
}
