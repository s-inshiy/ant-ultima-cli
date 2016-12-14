import {
  Component,
  OnInit
} from '@angular/core';
import {
  RegionService
} from './region.service';
import {
  Message,
  MenuItem
} from 'primeng/primeng';

@Component({
  selector: 'app-region',
  providers: [
    RegionService
  ],
  templateUrl: './region.component.html'
})

export class RegionComponent implements OnInit {

  region: Region = new NewRegion();
  pag: Paginate = new NewPaginate();
  items: any;
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;

  ngOnInit() {
    this.getRegions(this.pag.curr);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteRegion(this.region.id, this.region.name)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
  }

  constructor(private regionService: RegionService) {}

  getRegions(page: number) {
    this.regionService
      .getRegions(page)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.log(err),
        // () => console.log('Regions')
      );
  }

  // Paginate
  paginate(event: any) {
    this.pag.curr = Math.ceil(event.first / 20 + 1);
    this.getRegions(this.pag.curr);
  }

  showDialog() {
    this.dialog = true;
  }

  onRowSelect(event: any) {
    this.region.id = event.data.id;
    this.region.name = event.data.name;
  }

  onRowUnselect($event) {
    this.region = new NewRegion();
  }

  createRegion(id: number, name: string) {
    this.regionService
      .createRegion(this.region.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].create;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getRegions(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Регион создан',
              detail: this.region.name
            });
            this.region = new NewRegion();
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

  updateRegion(id: number, name: string) {
    this.regionService
      .updateRegion(this.region.id, this.region.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].update;
        },
        err => console.log(err),
        () => {
          console.log(this.resCRUD);
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getRegions(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Регион обновлён',
              detail: this.region.name
            });
            this.region = new NewRegion();
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

  deleteRegion(id: number, street: string) {
    this.regionService
      .deleteRegion(this.region.id)
      .subscribe(
        data => {
          this.resCRUD = data;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'error',
            summary: 'Регион удалён',
            detail: this.region.name
          });
          this.getRegions(this.pag.curr);
          this.dialog = false;
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

export interface Region {
  id ?: any;
  name ?: any;
}

class NewRegion implements Region {
  constructor(public id ?: any, public name ?: any) {}
}
