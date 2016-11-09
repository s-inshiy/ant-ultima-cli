import {
  Component,
  OnInit
} from '@angular/core';
import {
  MasterService
} from './master.service';
import {
  Router
} from '@angular/router';

import {
  Message,
  MenuItem
} from 'primeng/primeng';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  providers: [
    MasterService
  ]
})
export class MasterComponent implements OnInit {

  // Classes
  pag: Paginate = new NewPaginate();
  master: Master = new NewMaster();
  user: Search = new SearchUsers();
  company: Search = new SearchUsers();

  // PrimeNG
  items: any[];
  msgs: Message[];
  tieredItems: MenuItem[];


  dialog: boolean;
  resCRUD: any;

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit() {
    this.getMasters(this.pag.curr);
    this.tieredItems = [{
      label: 'Просмотр',
      icon: 'fa ui-icon-remove-red-eye',
      command: (event) => this.gotoMasterDetail(this.master.id)
    },
    //  {
    //   label: 'Редактировать',
    //   icon: 'fa ui-icon-edit',
    //   command: (event) => this.showDialog()
    // },
     {
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteMaster(this.master.id, this.master.fullName)
    }];
  }

  gotoMasterDetail(id: any) {
    this.router.navigate(['master', this.master.id]);
  }
  showDialog() {
    this.dialog = true;
  }

  onRowSelect(event: any) {
    this.master.id = event.data.id;
    this.master.fullName = event.data.fullName;
    // this.area.settlement = event.data.settlement;
    // console.log(this.area);
  }

  onRowUnselect($event) {
    this.master = new NewMaster();
  }

  getMasters(count: number) {
    this.masterService
      .getMasters(this.pag.curr)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['page-count'];
        },
        err => console.error(err),
        () => {
          // console.log('GET Masters');
        }
      );
  }

  searchUser(event: any) {
    this.masterService
      .searchUser(event.query)
      .subscribe(
        data => {
          this.user.result = data[0].json.data;
        },
        err => console.log(err),
        // () => {
        //   console.log(this.user);
        // }
      );
  }

  searchCompany(event: any) {
    this.masterService
      .searchCompany(event.query)
      .subscribe(
        data => {
          this.company.result = data[0].json.data;
        },
        err => console.log(err),
        // () => {
        //   console.log(this.resSearchUser[0].second_name);
        // }
      );
  }

  createMaster(userId: number, companyId: number) {
    this.masterService
      .createMaster(this.user.id, this.company.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          console.log(this.resCRUD);
          if (this.resCRUD.errors.length < 1 && this.resCRUD) {
            this.getMasters(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Мастер добавлен',
              detail: this.user.result[0].second_name +
                ' ' + this.user.result[0].first_name + ' ' + this.user.result[0].patronymic
            });
            this.user = new SearchUsers();
            this.company = new SearchUsers();
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

  updateMaster(id: number, userId: number, branchId: number) {
    this.masterService
      .updateMaster(this.master.id, this.user.id, this.company.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getMasters(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Мастер обновлён',
              detail: this.user.result[0].second_name +
                ' ' + this.user.result[0].first_name + ' ' + this.user.id[0].patronymic
            });
            this.user = new SearchUsers();
            this.company = new SearchUsers();
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

  deleteMaster(id: number, name: string) {
    this.masterService
      .deleteMaster(this.master.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getMasters(this.pag.curr);
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Мастер удалён',
            detail: this.master.fullName
          });
        }
      );
  }


}

export interface Master {
  id ?: number;
  fullName ?: string;
  areas ?: string;
  companyName ?: string;
  worksCount ?: number;
  rating ?: number;
}

class NewMaster implements Master {
  constructor(public id ?: number, public fullName ?: string, public areas ?: string,
    public companyName ?: string, public worksCount ?: number, public rating ?: number) {}
}


export interface Paginate {
  count ?: string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ?: string[], public curr = 1) {}
}

export interface Search {
  id ?: number;
  complete ?: string;
  result ?: any[];
}

class SearchUsers implements Search {
  constructor(public id ?: number, public complete ?: string, public result ?: string[]) {}
}
