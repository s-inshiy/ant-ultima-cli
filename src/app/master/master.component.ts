import {
  Component,
  OnInit
} from '@angular/core';
import {
  MasterService
} from './master.service';

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

  // PrimeNG
  items: any[];
  msgs: Message[];
  tieredItems: MenuItem[];

  constructor(private masterService: MasterService) {}

  ngOnInit() {
    this.getMasters(this.pag.curr);
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

}


export interface Master {
  id?: number;
  fullName?: string;
  areas?: string;
  companyName?: string;
  worksCount?: number;
  rating?: number;
}

class NewMaster implements Master {
  constructor(public id ? : number, public fullName ? : string, public areas ? : string,
    public companyName ? : string, public worksCount ? : number, public rating ? : number) {}
}


export interface Paginate {
  count ? : string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ? : string[], public curr = 1) {}
}
