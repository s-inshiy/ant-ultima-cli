import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  LandingService
} from './landing.service';
import {
  Message,
  SelectItem
} from 'primeng/primeng';
import {
  PageScrollConfig
} from 'ng2-page-scroll';

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

  services: any;
  mapServices: any[] = [];
  registration: Registration = new NewRegistration();
  request: Request = new NewRequest();
  token: string;
  resCRUD: any;
  msgs: Message[];
  types: SelectItem[];
  dialogReg: boolean;
  dialogReq: boolean;

  constructor(private landingService: LandingService, private router: Router) {}

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
    this.getOtherServices();

    this.types = [];
    this.types.push({
      label: 'Воспользуюсь услугами',
      value: 'client'
    });
    this.types.push({
      label: 'Предоставляю услуги',
      value: 'master'
    });

  }

  // Active Card
  isActive(index) {
    for (let i = 0; i < this.mapServices.length; i++) {
      this.mapServices[i].show = false;
    }
    this.mapServices[index].show = !this.mapServices[index].show;
  }

  getCall(e: MouseEvent, i: any, work: any) {
    this.request.service = work[i].name;
    this.request.id = work[i].id;
    this.dialogReq = true;
  }

  setCall(service: string, phone: string, email: string) {
    this.landingService
      .setCall(this.request.id, this.request.phone, this.request.email)
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

  getOtherServices() {
    this.landingService
      .getOtherServices()
      .subscribe(
        data => {
          this.mapServices = data[0].json;
          if (this.mapServices) {
            let i = 0;
            for (i; i < this.mapServices.length; i++) {
              this.mapServices[i].img = i + 1;
              this.mapServices[i].show = false;
            }
          }
        },
        err => console.error(err),
        () => {
          // console.log(this.mapServices);
        }
      );
  }

  setRegistration(username: string, password: string, email: string, firstName: string,
    secondName: string, patronymic: string, phone: string) {
    this.landingService
      .setRegistration(this.registration.type, this.registration.username, this.registration.password,
        this.registration.email, this.registration.firstName, this.registration.secondName,
        this.registration.patronymic, this.registration.phone)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
          this.token = data[0].json['token']
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
          // Set token
          if (this.token) {
            localStorage.setItem('id_token', this.token);
            this.router.navigate(['/dashboard/settings']);
            return true;
          }
        }
      );
  }

   showReg() {
    this.dialogReg = true;
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

}

export interface Registration {
  type: any;
  username ? : any;
  password ? : any;
  email ? : any;
  firstName ? : any;
  secondName ? : any;
  patronymic ? : any;
  phone ? : any;
}

class NewRegistration implements Registration {
  constructor(public type = 'client', public username ? : any, public password ? : any,
    public email ? : any, public firstName ? : any,
    public secondName ? : any, public patronymic ? : any, public phone ? : any) {}
}

export interface Request {
  id ? : any;
  service ? : any;
  phone ? : any;
  email ? : any;
}

class NewRequest implements Request {
  constructor(public id ? : any, public service ? : any, public phone ? : any, public email ? : any) {}
}


export interface Card {
  id ? : any;
  name ? : any;
  img ? : any;
  works ? : any;
  show ? : any;
  categories ? : any;
}

class NewCard implements Card {
  constructor(id ? : any, name ? : any, img ? : any, works ? : any, show ? : any, categories ? : any) {}
}
