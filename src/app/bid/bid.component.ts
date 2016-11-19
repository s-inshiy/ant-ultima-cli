import {
  Component,
  OnInit,
} from '@angular/core';

import {
  BidService
} from './bid.service';

import {
  Message,
  MenuItem,
  SelectItem
} from 'primeng/primeng';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss'],
  providers: [
    BidService
  ]
})

export class BidComponent implements OnInit {

  // Classes
  pag: Paginate = new NewPaginate();
  searchBid: Bid = new NewBid();
  bid: Bid = new NewBid();
  schedule: Schedule = new NewSсhedule();
  master: Search = new SearchRegion();

  // PrimeNG
  items: any;
  msgs: Message[];
  tieredItems: MenuItem[];

  dialog: boolean;
  resCRUD: any;
  ru: any;

  constructor(private bidService: BidService) {}

  ngOnInit() {
    this.getBids(this.pag.curr);
    this.tieredItems = [{
      label: 'Мастер',
      icon: 'fa ui-icon-add',
      command: (event) => this.showDialog()
    }, {
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      // command: (event) => this.deleteArea(this.area.id, this.area.name)
    }];
    // Locale Calendar
    this.ru = {
      // Date 
      closeText: 'Закрыть',
      prevText: '&#x3C;Пред',
      nextText: 'След&#x3E;',
      currentText: 'Сегодня',
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
      ],
      dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekHeader: 'Нед'
    };
  }

  showDialog() {
    this.dialog = true;
  }

getSeconds(event: any) {
  this.schedule.milisec = event.getTime();
}

  getBids(page: number, id ? : any, fio ? : any, phone ? : any) {
    this.bidService
      .getBids(this.pag.curr, this.searchBid.id, this.searchBid.fio, this.searchBid.phone)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
        },
        err => console.error(err),
        () => console.log(this.items)
      );
  }

  getBidsMasters(id: string) {
    this.bidService
      .getBidsMasters(id)
      .subscribe(
        data => {
          this.master.result = data[0].json.results;
        },
        err => console.error(err),
        // () => console.log('Search masters...')
      );
  }

  onRowSelect(event: any) {
    this.bid.id = event.data.id;
    this.getBidsMasters(this.bid.id);
  }

  addMaster() {
    this.bidService
      .addMaster(this.bid.id, this.schedule.id, this.schedule.milisec)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          this.dialog = false;
          if (this.resCRUD.errors.length < 1) {
            this.getBids(this.pag.curr);
            // this.showMaster = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Задание добавлено',
              detail: 'Задание добавлено'
            });
            this.schedule = new NewSсhedule();
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

  deleteBid(id: number) {
    this.bidService
      .deleteBid(this.bid.id)
      .subscribe(
        data => {
          this.resCRUD = data;
        },
        err => console.log(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Заявка удалена',
            detail: this.bid.fio
          });
        }
      );
  }

}

export interface Bid {
  id ? : any;
  address ? : any;
  manager ? : any;
  service ? : any;
  fio ? : any;
  phone ? : any;
  master ? : any;
  contact_person ? : any;
  status ? : any;
  description ? : any;
  created_at ? : any;
}


class NewBid implements Bid {
  constructor(public id ? : any, public address ? : any, public manager ? : any, public service ? : any,
    public fio ? : any, public phone ? : any, public master ? : any, public contact_person ? : any,
    public status ? : any, public description ? : any,
    public created_at ? : any) {}
}

export interface Search {
  complete ? : SelectItem[];
  result ? : [number];
  id ? : number;
}

class SearchRegion implements Search {
  constructor(public complete ? : SelectItem[], public result ? : [number], public id ? : number) {}
}

export interface Paginate {
  count ? : string[];
  curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ? : string[], public curr = 1) {}
}

export interface Schedule {
  id ? : number;
  datetime ? : Date;
  milisec ?: number;
}

class NewSсhedule implements Schedule {
  constructor(public id ? : number, public datetime ? : Date, public milisec ?: number) {}
}
