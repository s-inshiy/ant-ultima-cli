import {
  Component,
  OnInit
} from '@angular/core';
import {
  MasterScheduleService
} from './master-schedule.service';

@Component({
  selector: 'app-master-schedule',
  templateUrl: './master-schedule.component.html',
  styleUrls: ['./master-schedule.component.scss'],
  providers: [
    MasterScheduleService
  ]
})
export class MasterScheduleComponent implements OnInit {

  items: any[];
  headerConfig: any;
  ru: any;

  constructor(private masterScheduleService: MasterScheduleService) {}

  ngOnInit() {
    // this.headerConf = {
    //   left: 'prev,next today',
    //   center: 'title',
    //   right: 'month,agendaWeek'
    // };
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
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
    this.getMasterSchedule(10);
  }

  getMasterSchedule(id: number) {
    this.masterScheduleService
      .getMasterSchedule(id)
      .subscribe(
        data => {
          this.items = data[0].json.data;
        },
        err => console.error(err),
        () => {
          // console.log(this.items);
        }
      );
  }

}
