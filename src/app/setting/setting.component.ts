import {
  Component,
  OnInit
} from '@angular/core';

import {
  SettingService
} from './setting.service';

import {
  Message,
  MenuItem,
} from 'primeng/primeng';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [
    SettingService
  ]
})

export class SettingComponent implements OnInit {

  profiles: any[];
  accounts: any[];
  phones: any[];
  addresses: any[];

  ru: any;

  // Context Menu
  tieredPhone: MenuItem[];
  tieredAddress: MenuItem[];

  // PrimeNG
  msgs: Message[];

  account: Account = new NewAccount();
  address: Address = new NewAddress();
  profile: Profile = new NewProfile();
  street: Search = new SearchStreet();
  schedule: Schedule = new NewSсhedule();

  phone: any;

  dialog: boolean;
  dialogAccount: boolean;
  dialogPhone: boolean;
  dialogAddress: boolean;
  resCRUD: any;

  constructor(private settingService: SettingService) {}

  ngOnInit() {
    this.getProfile();
    this.getAccount();
    this.getPhones();
    this.getAddress();
    // Context Menu
    this.tieredAddress = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteAddress(this.address.id, this.address.street)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
    this.tieredPhone = [{
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      // command: (event) => this.deletePhone(this.address.id, this.address.street)
    }, {
      label: 'Редактировать',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialog()
    }];
    // Calendar Locale
    this.ru = {
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

  // Pfofile

  getProfile() {
    this.settingService
      .getProfile()
      .subscribe(
        data => {
          this.profiles = data[0].json.data;
        },
        err => console.error(err),
        () => {
          console.log(this.profiles);
        }
      );
  }

  updateProfile(firstName ? : string, secondName ? : string, patronymic ?
   : string, phone ? : string, skype ? : string, birthday ?: string) {
    this.settingService
      .updateProfile(this.profile.firstName, this.profile.secondName, 
      this.profile.patronymic, this.profile.phone, this.profile.skype, this.schedule.milisec)
      .subscribe(
        data => {
          this.resCRUD = data[0].json[0];
        },
        err => console.error(err),
        () => {
          this.dialog = false;
          this.getProfile();
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Профиль обновлён',
            detail: 'Информация профиля  обновленна'
          });
        }
      );
  }

  getSeconds(event: any) {
    this.schedule.milisec = event.getTime();
  }

  showDialog() {
    this.dialog = true;
    this.profile.secondName = this.profiles[0].second_name;
    this.profile.firstName = this.profiles[0].second_name;
    this.profile.patronymic = this.profiles[0].patronymic;
    this.profile.phone = this.profiles[0].phone;
    this.profile.skype = this.profiles[0].skype;
    this.profile.birthday = this.profiles[0].bithday;
  }

  //  Account

  getAccount() {
    this.settingService
      .getAccount()
      .subscribe(
        data => {
          this.accounts = data[0].json.data;
        },
        err => console.error(err),
        // () => {
        //   console.log(this.accounts);
        // }
      );
  }

  showAccount() {
    this.dialogAccount = true;
    this.account.username = this.accounts[0].username;
    this.account.email = this.accounts[0].email;
  }

  updateAccount(username: string, email: string, password: string) {
    this.settingService
      .updateAccount(this.account.username, this.account.email, this.account.password)
      .subscribe(
        data => {
          this.resCRUD = data[0].json[0];
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Профиль обновлён',
            detail: 'Информация аккаунта  обновленна'
          });
        }
      );
  }

  //  Phone

  showDialogPhone() {
    this.dialogPhone = true;
  }

  getPhones() {
    this.settingService
      .getPhones()
      .subscribe(
        data => {
          this.phones = data[0].json.data;
        },
        err => console.error(err),
        // () => console.log(this.phones)
      );
  }

  createPhone() {
    this.settingService
      .createPhone(this.phone)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getPhones();
          this.dialogPhone = false;
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Телефон добавлен',
            detail: 'Телефон добавлен'
          });
        }
      );
  }

  //  Address

  onRowSelect(event) {
    this.address.id = event.id;
    this.address.street = event.street;
  }

  showAddress() {
    this.dialogAddress = true;
  }

  getAddress() {
    this.settingService
      .getAddress()
      .subscribe(
        data => {
          this.addresses = data[0].json.data;
        },
        err => console.error(err),
        // () => console.log()
      );
  }

  searchStreet(event: any) {
    this.settingService
      .searchStreet(event.query)
      .subscribe(
        data => {
          this.street.result = data[0].search.results;
        },
        err => console.error(err),
        // () => console.log('Street search...')
      );
  }

  createAddress(id: string, house: string, isDefault: any, description ? : any) {
    this.settingService
      .createAddress(this.street.id, this.address.house, this.address.isDefault, this.address.description)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getAddress();
          this.dialogAddress = false;
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Адрес добавлен',
            // detail: this.oneAddress.description
          });
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

  deleteAddress(id: number, street: string) {
    this.settingService
      .deleteAddress(this.address.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].delete;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Адрес удалён',
            detail: this.address.street
          });
        }
      );
  }

}

export interface Profile {
  birthday ? : any;
  firstName ? : any;
  patronymic ? : any;
  phone ? : any;
  phones ? : any;
  secondName ? : any;
  sex ? : any;
  skype ? : any;
}

class NewProfile implements Profile {
  constructor(public birthday ? : any, public firstName ? : any, public patronymic ? : any, public phone ? : any, public phones ? : any,
    public secondName ? : any, public sex ? : any, public skype ? : any) {}
}

export interface Account {
  username ? : any;
  email ? : any;
  password ? : any;
}

class NewAccount implements Account {
  constructor(public username ? : any, public email ? : any,
    public password ? : any) {}
}

export interface Address {
  id ? : any;
  street ? : any;
  house ? : string;
  isDefault: boolean;
  description ? : string;
}

class NewAddress implements Address {
  constructor(public id ? : any, public house ? : string, public street ? : string,
    public isDefault = false, public description ? : string) {}
}

export interface Search {
  id ? : string;
  complete ? : string;
  result ? : string[];
}

class SearchStreet implements Search {
  constructor(public id ? : string, public complete ? : string, public result ? : string[]) {}
}

export interface Schedule {
  id ? : number;
  datetime ? : Date;
  milisec ? : string;
}

class NewSсhedule implements Schedule {
  constructor(public id ? : number, public datetime ? : Date, public milisec ? : string) {}
}
