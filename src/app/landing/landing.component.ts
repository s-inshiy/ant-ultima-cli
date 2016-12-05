import {
  Component,
  OnInit
} from '@angular/core';

import {
  PageScrollConfig
} from 'ng2-page-scroll';

import {
  LandingService
} from './landing.service';

import {
  Message
} from 'primeng/primeng';

declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  viewProviders: [
    LandingService
  ]
})

export class LandingComponent implements OnInit {

  partners: any;
  services: any;

  titles: any[] = [];
  lists: any[] = [];

  registration: Registration = new NewRegistration();
  request: Request = new NewRequest();

  dialogReg: boolean;
  dialogReq: boolean;

  resCRUD: any;
  msgs: Message[];

  constructor(private landingService: LandingService) {}

  ngOnInit() {
    //  Toggle Menu
    $(function () {
      $('#menu-button').on('click', function (e) {
        let menu = $('#menu');
        if (menu.hasClass('lmenu-active')) {
          menu.addClass('fadeOutUp');

          setTimeout(function () {
            menu.removeClass('fadeOutUp fadeInDown lmenu-active');
          }, 500);
        } else {
          menu.addClass('lmenu-active fadeInDown');
        }
        e.preventDefault();
      });
    });
    // Slick Slider
    $('.partner__slider').slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      }, {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      }, {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      }]
    });
    // ng2PageScroll
    PageScrollConfig.defaultScrollOffset = 100;
    // Services
    this.getServices();
  }

  // Active Card
  isActive(index) {
    for (let i = 0; i < this.titles.length; i++) {
      this.titles[i].show = false;
    }
    this.titles[index].show = !this.titles[index].show;
  }

  getCall(e: MouseEvent, i: any, work: any) {
    this.request.service = work[i].name;
    this.dialogReq = true;
    // console.log(this.request);
  }

  setCall(service: string, phone: string) {
    this.landingService
      .setCall(this.request.service, this.request.phone)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.dialogReq = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Звонок заказан успешно',
              detail: this.request.phone
            });
            this.request = new NewRequest();
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

  getServices() {
    this.landingService
      .getServices()
      .subscribe(
        data => {
          this.services = data[0].json;
        },
        err => console.error(err),
        () => {
          let i = 0;
          for (i; i < this.services.length; i++) {
            // console.log(this.services[i].data.name + '-------------------- ');
            let a = 0;
            for (a; a < this.services[i].children.length; a++) {
              this.lists.push({
                name: this.services[i].children[a].data.name
              });
              //  console.log(this.services[i].children[a].data.name);
            }
            this.titles.push({
              id: i,
              name: this.services[i].data.name,
              img: i + 1,
              works: this.lists,
              show: false,
            });
            this.lists = [];
          }
        }
      );
  }

  showReg() {
    this.dialogReg = true;
  }

  setRegistration(username: string, password: string, email: string, firstName: string,
    secondName: string, patronymic: string, phone: string) {
    this.landingService
      .setRegistration(this.registration.username, this.registration.password,
        this.registration.email, this.registration.firstName, this.registration.secondName,
        this.registration.patronymic, this.registration.phone)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.dialogReg = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Регистрация прошла успешно',
              detail: this.registration.username
            });
            this.registration = new NewRegistration();
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

export interface Registration {
  username ? : any;
  password ? : any;
  email ? : any;
  firstName ? : any;
  secondName ? : any;
  patronymic ? : any;
  phone ? : any;
}

class NewRegistration implements Registration {
  constructor(public username ? : any, public password ? : any,
    public email ? : any, public firstName ? : any,
    public secondName ? : any, public patronymic ? : any, public phone ? : any) {}
}

export interface Request {
  service ? : any;
  phone ? : any;
}

class NewRequest implements Request {
  constructor(public service ? : any, public phone ? : any) {}
}
