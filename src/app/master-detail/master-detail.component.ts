import {
  Component,
  OnInit
} from '@angular/core';

import {
  MasterDetailService
} from './master-detail.service';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Message,
  MenuItem,
} from 'primeng/components/common/api';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss'],
  providers: [
    MasterDetailService
  ]
})
export class MasterDetailComponent implements OnInit {

  // Data
  masters: any[];
  services: any[];
  areas: any[];
  events: any[];

  // Classes
  masterEvent: Event = new NewMaster();
  service: Search = new SearchAreas();
  area: Search = new SearchAreas();
  pag: Paginate = new NewPaginate();

  // PrimeNG
  msgs: Message[];
  tieredItems: MenuItem[];
  areaItems: MenuItem[];
  headerConfig: any;
  ru: any;

  id: number;
  resCRUD: any;
  dialog: boolean;
  dialogArea: boolean;
  dialogEvent: boolean;

  constructor(private masterDetailService: MasterDetailService, private route: ActivatedRoute, private router: Router) {}

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
    }];
    // Master Schedule
    this.getMasterSchedule(this.id);
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek'
    };
    this.ru = {
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
      ],
      dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      buttonText: {
        month: 'Месяц',
        week: 'Неделя',
        day: 'День',
        list: 'Повестка дня',
        today: 'Сегодня',
      },
      allDayText: 'Весь день',
    };
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
          this.masters = data[0].json;
        },
        err => console.error(err),
        // () => {}
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
        // () => {}
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
        // () => { }
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
        //  () => { }
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
        // () => {}
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

  // Master Schedule & Events

  getMasterSchedule(id: number) {
    this.masterDetailService
      .getMasterSchedule(id)
      .subscribe(
        data => {
          this.events = data[0].json.data;
        },
        err => console.error(err),
        // () => {}
      );
  }

  //   showDialogEvent() {
  //   this.dialogEvent = true;
  // }

  detailEvent(event: any) {
    this.masterDetailService
      .detailEvent(this.masterEvent.id = event.calEvent.id)
      .subscribe(
        data => {
          this.masterEvent = data[0].json[0];
        },
        err => console.error(err),
        () => {
          this.dialogEvent = true;
        }
      );
  }

  updateEventTime(event: any) {
    this.masterDetailService
      .updateEventTime(this.masterEvent.id = event.event.id,
        this.masterEvent.start = event.event.start.format().replace('T', ' '))
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          console.log(this.resCRUD);
        }
      );
  }

  	// updateEventDuration(event: any) {
		// 	this.masterEvent.duration	= moment.utc(moment(event.event.end.format().replace('T',' '),'YYYY-MM-DD HH:mm:ss')
		// 	.diff(moment(event.event.start.format().replace('T',' '),'YYYY-MM-DD HH:mm:ss'))).valueOf();
		// 	this.masterEvent.duration =  moment.duration(this.masterEvent.duration).asSeconds();

		// 	this._managerService
		// 		.updateEventDuration(event.event.id, this.masterEvent.duration)
		// 		.subscribe(
		// 			data => {
		// 				this.resEventDuration = data[0].json;
		// 			},
		// 			err => console.error(err),
		// 			() => {
		// 				console.log(this.resEventDuration);
		// 			}
		// 		);
		// }

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

export interface Search {
  id ? : number;
  name ? : string;
  complete ? : string;
  result ? : string[];
  price ? : number;
}

class SearchAreas implements Search {
  constructor(public complete ? : string, public result ? : string[]) {}
}

export interface Paginate {
  count ? : string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ? : string[], public curr = 1) {}
}

export interface Event {
  id ? : number;
  titile ? : string;
  allDay ? : boolean;
  master ? : string;
  start ? : string;
  end ? : string;
  urlData ? : string;
  status ? : string;
  price ? : number;
  duration ? : number | string;
}

class NewEvent implements Event {
  constructor(public id ? : number, public titile ? : string, public allDay ? : boolean, public master ? : string,
    public start ? : string, public end ? : string, public urlData ? : string, public status ? : string,
    public price ? : number, public duration ? : number | string
  ) {}
}
