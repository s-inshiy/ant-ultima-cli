import {
  Component,
  OnInit
} from '@angular/core';
import {
  MasterDetailService
} from './master-detail.service';
import {
  ActivatedRoute
} from '@angular/router';

import {
  Message,
  MenuItem,
} from 'primeng/primeng';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss'],
  providers: [
    MasterDetailService
  ]
})
export class MasterDetailComponent implements OnInit {

  private id;

  // PrimeNG
  items: any[];
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;

  constructor(private masterDetailService: MasterDetailService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getMasterDetail(this.id);
  }

  getMasterDetail(id: number) {
    this.masterDetailService
      .getlMasterDetail(id)
      .subscribe(
        data => {
          this.items = data[0].json;
        },
        err => console.error(err),
        () => {
          // console.log(this.masterDetail);
        }
      );
  }

}

export interface Service {
  id ? : number;
  name ? : string;
  price ? : number;
}

class NewService implements Service {
  constructor(public id ? : number, public name ? : string, public price ? : number) {}
}

export interface Area {
  id ? : number;
  settlement ? : string;
  name ? : string;
}

class NewArea implements Area {
  constructor(public id ? : number, public settlement ? : string, public name ? : string) {}
}

export interface Master {
  areas ? : string;
  companyName ? : string;
  fullName ? : string;
  id ? : number;
  rating ? : number;
  services ? : string;
  status ? : string;
  worksCount ? : number;
}

class NewMaster implements Master {
  constructor(public areas ? : string, public companyName ? : string, public fullName ? : string, public id ? : number,
    public rating ? : number, public services ? : string, public status ? : string, public worksCount ? : number) {}
}
