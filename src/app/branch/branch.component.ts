import {
  Component,
  OnInit
} from '@angular/core';
import {
  BranchService
} from './branch.service';
import {
  RegionService
} from '../region/region.service';

import {
  Message,
  MenuItem,
  SelectItem
} from 'primeng/components/common/api';

@Component({
  selector: 'app-branch',
  providers: [
    BranchService, RegionService
  ],
  templateUrl: './branch.component.html'
})

export class BranchComponent implements OnInit {

  // Classes
  branch: Branch = new NewBranch;
  pag: Paginate = new NewPaginate();
  search: Search = new SearchRegion();

  // PrimeNG
  items: any;
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;
  // resRegion: SelectItem[];

  constructor(private branchService: BranchService,
    private regionService: RegionService) {}

  ngOnInit() {
    this.getBranches(this.pag.curr);
    this.getRegions(0);
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteBranch(this.branch.id, this.branch.name)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
  }

  showDialog() {
    this.dialog = true;
    this.search.result = null;
  }

  onRowSelect(event: any) {
    this.branch.id = event.data.id;
    this.branch.name = event.data.name;
    this.branch.regions = event.data.settlement;
  }

  onRowUnselect($event) {
    this.branch = new NewBranch();
  }

  getBranches(page: number) {
    this.branchService
      .getBranch(this.pag.curr)
      .subscribe(
        data => {
          this.items = data[0].json.data;
        },
        err => console.error(err),
        // () => {
        //   console.log('GET Branches!');
        // }
      );
  }

  getRegions(page: number) {
    this.regionService
      .getRegions(page)
      .subscribe(
        data => {
          this.search.complete = data[0].json.data;
        },
        err => console.log(err),
        // () => console.log('Regions')
      );
  }

  createBranch(name: string, regions: [number]) {
    this.branchService
      .createBranch(this.branch.name, this.search.result)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getBranches(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Филиал добавлен',
              detail: this.branch.name
            });
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

  updateBranch(id: number, name: string, resRegions: [number]) {
    this.branchService
      .updateBranch(this.branch.id, this.branch.name, this.search.result)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getBranches(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Филиал обновлён',
              detail: this.branch.name
            });
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

  deleteBranch(id: number, name: string) {
    this.branchService
      .deleteBranch(this.branch.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Филиал удалён',
            detail: this.branch.name
          });
          this.branch = new NewBranch();
          this.getBranches(this.pag.curr);
        }
      );
  }


}

export interface Branch {
  id ?: number;
  name ?: string;
  regions ?: any;
  managers ?: string;
}

class NewBranch implements Branch {
  constructor(public id ?: number, public name ?: string, public regions ?: any,
    public managers ?: string) {}
}

export interface Paginate {
  count ?: string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ?: string[], public curr = 1) {}
}

export interface Search {
  complete ?: SelectItem[];
  result ?: [number];
}

class SearchRegion implements Search {
  constructor(public complete ?: SelectItem[], public result ?: [number]) {}
}
