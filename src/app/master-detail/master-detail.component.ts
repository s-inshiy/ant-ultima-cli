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

  id: number;
  items: any[];
  services: any[];
  areas: any[];

  service: Search = new SearchAreas();
  area: Search = new SearchAreas();
  pag: Paginate = new NewPaginate();

  // PrimeNG
  msgs: Message[];
  tieredItems: MenuItem[];
  areaItems: MenuItem[];

  dialog: boolean;
  dialogArea: boolean;
  resCRUD: any;

  constructor(private masterDetailService: MasterDetailService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getMasterDetail(this.id);
    this.getMasterServices(this.id);
    this.getMasterAreas(this.id);
    // ContextMenu
    this.tieredItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteMasterService(this.service.id, this.id)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
    this.areaItems = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteMasterArea(this.area.id, this.id)
    }]
  }

  showDialogArea() {
    this.dialogArea = true;
  }

  showDialog() {
    this.dialog = true;
  }

  getMasterDetail(id: number) {
    this.masterDetailService
      .getMasterDetail(id)
      .subscribe(
        data => {
          this.items = data[0].json;
        },
        err => console.error(err),
        // () => {
        //   console.log(this.masterDetail);
        // }
      );
  }

  getMasterServices(id: number) {
    this.masterDetailService
      .getMasterServices(id)
      .subscribe(
        data => {
          this.services = data[0].json;
        },
        err => console.error(err),
        // () => {
        //   console.log(this.masterDetail);
        // }
      );
  }

  searchService(query ? : string, serviceIds ? : string | number) {
    this.masterDetailService
      .searchService(query)
      .subscribe(
        data => {
          this.service.result = data[0].search.results;
        },
        err => console.error(err),
        () => {
          //  console.log('Work Search...');
          console.log(this.service.result)
        }
      );
  }

  addMasterService(Id: number, serviceId: number, price: number) {
    this.masterDetailService
      .addMasterService(this.id, this.service.id, this.service.price)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
          console.log(this.resCRUD);
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getMasterServices(this.id);
            this.getMasterDetail(this.id);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Услуга добавлена',
              detail: 'Услуга добавлена'
            });
            this.service = new SearchAreas();
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

  onRowSelectService(event: any) {
    this.service.id = event.data.id;
    this.service.name = event.data.name;
  }

  onRowSelectArea(event: any) {
    this.area.id = event.data.id;
    this.area.name = event.data.name;
  }

  onRowUnselect($event) {
    this.area = new SearchAreas();
  }



  deleteMasterService(serviceId: number, masterId: number) {
    this.masterDetailService
      .deleteMasterService(this.service.id, this.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getMasterServices(this.id);
            this.getMasterDetail(this.id);
            this.msgs.push({
              severity: 'info',
              summary: 'Услуга удалена',
              detail: this.service.name
            });
            this.service = new SearchAreas();
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

  getMasterAreas(id: number) {
    this.masterDetailService
      .getMasterAreas(id)
      .subscribe(
        data => {
          this.areas = data[0].json;
        },
        err => console.error(err),
        //  () => {
        //  }
      );
  }

  searchArea(query ? : string, areasIds ? : string | number) {
    this.masterDetailService
      .searchMasterAreas(query)
      .subscribe(
        data => {
          this.area.result = data[0].search.data;
        },
        err => console.error(err),
        // () => {
        //   console.log('Area Search..');
        // }
      );
  }

  addMasterArea(Id: number, areaId: number) {
    this.masterDetailService
      .addMasterArea(this.id, this.area.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getMasterAreas(this.id);
            this.getMasterDetail(this.id);
            this.dialogArea = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Нас. пункт добавлен',
              detail: 'Нас. пункт добавлен'
            });
            this.area = new SearchAreas;
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

  deleteMasterArea(areaId: number, id: number) {
    this.masterDetailService
      .deleteMasterArea(this.area.id, this.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getMasterAreas(this.id);
            this.getMasterDetail(this.id);
            this.msgs.push({
              severity: 'info',
              summary: 'Нас. пункт удалён',
              detail: this.area.name
            });
            this.area = new SearchAreas();
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

export interface Master {
  areas ?: string;
  companyName ?: string;
  fullName ?: string;
  id ?: number;
  rating ?: number;
  services ?: string;
  status ?: string;
  worksCount ?: number;
}

class NewMaster implements Master {
  constructor(public areas ?: string, public companyName ?: string, public fullName ?: string, public id ?: number,
    public rating ?: number, public services ?: string, public status ?: string, public worksCount ?: number) {}
}

export interface Search {
  id ?: number;
  name ? : string;
  complete ? : string;
  result ? : string[];
  price ? : number;
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
