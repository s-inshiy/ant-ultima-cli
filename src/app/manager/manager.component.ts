import {
  Component,
  OnInit
} from '@angular/core';
import {
  ManagerService
} from './manager.service';

import {
  // DataTableModule,
  // SharedModule,
  // Column,
  // InputText,
  // Growl,
  Message,
  // ContextMenuModule,
  MenuItem,
  // Paginator,
  // DialogModule,
  // Button,
  // Header,
  // Footer,
  // AutoComplete,
  // SelectItem,
  // Dropdown
} from 'primeng/primeng';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  providers: [
    ManagerService
  ]
})
export class ManagerComponent implements OnInit {

  // Classes
  manager: Manager = new NewManager();
  search: Search = new SearchAreas();
  pag: Paginate = new NewPaginate();

  // PrimeNG
  items: any[];
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;


  constructor(private managerService: ManagerService) {}

  ngOnInit() {
    this.getManagers(this.pag.curr);
  }

  getManagers(paget: number) {
    this.managerService
      .getManagers(this.pag.curr)
      .subscribe(
        data => {
          this.items = data[0].json.data;
        },
        err => console.error(err),
        () => {
          // console.log('GET Managers!');
        }
      );
  }

     searchUser(query: string) {
     this.managerService
        .searchUser(query)
        .subscribe(
          data => {
            this.search.complete = data[0].json.data;
          },
          err => console.error(err),
          () => {
            // console.log(this.resSearchUser[0].second_name);
          }
        );
   }

  //  searchBranch(query:string) {
  //    this._administratorService
  //       .searchBranch(query)
  //       .subscribe(
  //         data => {
  //           this.resSearchBranch = data[0].json.data;
  //         },
  //         err => console.error(err),
  //         () => {
  //           console.log('SEARCH Branch!');
  //         }
  //       );
  //  }



}


export interface Manager {
  id?: number;
  fio?: string;
  branch?: string;
}

class NewManager implements Manager {
  constructor(public id ?: number, public fio ?: string, public branch ?: string) {}
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
