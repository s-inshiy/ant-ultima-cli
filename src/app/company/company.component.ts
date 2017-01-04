import {
  Component,
  OnInit
} from '@angular/core';

import {
  CompanyService
} from './company.service';

import {
  Message,
  MenuItem
} from 'primeng/components/common/api';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  providers: [
    CompanyService
  ]
})
export class CompanyComponent implements OnInit {

  // Classes
  pag: Paginate = new NewPaginate();
  company: Company = new NewCompany();

  // PrimeNG
  items: any[];
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.getCompanies(this.pag.curr);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteCompany(this.company.id, this.company.name)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
  }

  showDialog() {
    this.dialog = true;
  }

  onRowSelect(event: any) {
    this.company.id = event.data.id;
    this.company.name = event.data.name;
  }

  onRowUnselect($event) {
    this.company = new NewCompany();
  }

  getCompanies(count: number) {
    this.companyService
      .getCompanies(this.pag.curr)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['page-count'];
        },
        err => console.error(err),
        // () => {
        //   console.log('GET Companies');
        // }
      );
  }

  createCompany(name: string) {
    this.companyService
      .createCompany(this.company.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getCompanies(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Компания создана',
              detail: this.company.name
            });
            this.company = new NewCompany();
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

  updateCompany(id: number, name: string) {
    this.companyService
      .updateCompany(this.company.id, this.company.name)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getCompanies(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Компания обновлена',
              detail: this.company.name
            });
            this.company = new NewCompany();
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

  deleteCompany(id: number, name: string) {
    this.companyService
      .deleteCompany(this.company.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getCompanies(this.pag.curr);
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Компания  удалена',
            detail: this.company.name
          });
          this.company = new NewCompany();
        }
      );
  }


}

export interface Company {
  id ? : number;
  name ? : string;
}

class NewCompany implements Company {
  constructor(public id ? : number, public name ? : string) {}
}

export interface Paginate {
  count ? : string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ? : string[], public curr = 1) {}
}
