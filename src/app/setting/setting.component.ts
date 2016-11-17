import {
  Component,
  OnInit
} from '@angular/core';

import {
  SettingService
} from './setting.service';

import {
  Message,
  // MenuItem,
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

  // PrimeNG
  msgs: Message[];

  acc: Account = new NewAccount();
  address: Address = new NewAddress();
  profile: Profile = new NewProfile();
  street: Search = new SearchStreet();
  phone: any;

  dialog: boolean;
  dialogAcc: boolean;
  dialogPhone: boolean;
  resCRUD: any;

  constructor(private settingService: SettingService) {}

  ngOnInit() {
    this.getProfile();
    this.getAccount();
    this.getPhones();
    this.getAddress();
  }

  showDialog() {
    this.dialog = true;
  }

  // Pfofile

  getProfile() {
    this.settingService
      .getProfile()
      .subscribe(
        data => {
          this.profiles = data[0].json;
        },
        err => console.error(err),
        () => {
          console.log(this.profile);
        }
      );
  }

  updateProfile(firstName ? : string, secondName ? : string, patronymic ? : string, phone ? : string) {
    this.settingService
      .updateProfile(this.profile.firstName, this.profile.secondName, this.profile.patronymic, this.profile.phone)
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
          // if (this.resCRUD.errors.length < 1) {
          //   this.getProfile();
          //   this.dialog = false;
          //   this.msgs.push({
          //     severity: 'info',
          //     summary: 'Нас. пункт создан',
          //     detail: 'Нас. пункт создан'
          //   });
          // }
          // for (let i = 0; i < this.resCRUD.errors.length; i++) {
          //   this.msgs.push({
          //     severity: 'error',
          //     summary: 'Ошибка',
          //     detail: this.resCRUD.errors[i]
          //   });
          // }
        }
      );
  }

  //  Account

  getAccount() {
    this.settingService
      .getAccount()
      .subscribe(
        data => {
          this.accounts = data[0].json;
        },
        err => console.error(err),
        // () => {}
      );
  }

  showDialogAcc() {
    this.dialogAcc = true;
  }

  updateAccount(username: string, email: string, password: string) {
    this.settingService
      .updateAccount(this.acc.username, this.acc.email, this.acc.password)
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
        () => console.log(this.phones)
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

  onRowSelect (event) {
    this.address.id = event.id;
  }

  getAddress() {
    this.settingService
      .getAddress()
      .subscribe(
        data => {
          this.addresses = data[0].json.data;
        },
        err => console.error(err),
        () => console.log(
          console.log(this.address)
          )
      );
  }

  createAddress(id: any, house: any, isDefault: any, description ?: any) {
    this.settingService
      .createAddress(this.street.id, this.address.house, this.address.isDefault, this.address.description)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Адрес добавлен',
            // detail: this.oneAddress.description
          });
        }
      );
  }

  deleteAddress(id: any) {
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
            // detail: this.oneAddress.id
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
  constructor( public username ? : any, public email ? : any,
    public password ? : any) {}
}

export interface Address {
  id ? : any;
  house ? : string;
  isDefault: boolean;
  description ? : string;
}

class NewAddress implements Address {
  constructor(public id ? : any, public house ? : string, public isDefault = false, public description ? : string) {}
}

export interface Search {
  id ? : string;
  complete ? : string;
  result ? : string[];
}

class SearchStreet implements Search {
  constructor(public id ? : string, public complete ? : string, public result ? : string[]) {}
}
