import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from './user.service';

import {
  Message,
  MenuItem,
  SelectItem
} from 'primeng/primeng';

import {
  LoginService
} from '../login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  // styleUrls: ['./user.component.scss'],
  providers: [
    UserService, LoginService
  ]
})
export class UserComponent implements OnInit {

  // Classes
  pag: Paginate = new NewPaginate();
  user: User = new NewUser();

  // PrimeNG
  items: any;
  msgs: Message[];
  tieredItems: MenuItem[];
  userRoles: SelectItem[];

  dialog: boolean;
  dialogRole: boolean;
  resCRUD: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers(this.pag.curr);
    this.userRoles = [];
    this.userRoles.push({
      label: 'Выберите роль',
      value: null
    });
    this.userRoles.push({
      label: 'Администратор',
      value: 'admin'
    });
    this.userRoles.push({
      label: 'Бухгалтер',
      value: 'accountant'
    });
    this.userRoles.push({
      label: 'Клиент',
      value: 'client'
    });
    // ContextMenu
    this.tieredItems = [{
      label: 'Изменить роль',
      icon: 'fa ui-icon-edit',
      command: (event) => this.showDialogRole()
    }, {
      label: 'Заблокировать',
      icon: 'fa ui-icon-block',
      command: (event) => this.blockUser(this.user.id)
    }, {
      label: 'Разблокировать',
      icon: 'fa ui-icon-beenhere',
      command: (event) => this.unBlockUser(this.user.id)
    }, {
      label: 'Удалить',
      icon: 'fa ui-icon-delete-forever',
      command: (event) => this.deleteUser(this.user.id, this.user.secondName)
    }];
  }

  showDialog() {
    this.dialog = true;
    this.user = new NewUser();
  }

  showDialogRole() {
    this.dialogRole = true;
  }

  onRowSelect(event: any) {
    this.user.id = event.data.id;
    this.user.secondName = event.data.second_name;
    this.user.role = event.data.role;
  }

  onRowUnselect($event) {
    this.user = new NewUser();
  }


  getUsers(page: number) {
    this.userService
      .getUsers(page)
      .subscribe(
        data => {
          this.items = data[0].json.data;
          this.pag.count = data[0].json['total-count'];
          // console.log(data[0].json);
        },
        err => console.error(err),
        () => {
        }
      );
  }

    // Paginate
  paginate(event: any) {
    this.pag.curr = Math.ceil(event.first / 20 + 1);
    this.getUsers(this.pag.curr);
  }


  createUser(firstName: string, secondName: string, patronymic: string, email: string, phone: string, username: string, password: string) {
    this.userService
      .createUser(this.user.firstName, this.user.secondName, this.user.patronymic,
        this.user.email, this.user.phone, this.user.userName, this.user.password)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.msgs = [];
          if (this.resCRUD.errors.length < 1) {
            this.getUsers(this.pag.curr);
            this.dialog = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Пользователь создан',
              detail: this.user.userName
            });
            this.user = new NewUser();
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

  deleteUser(id: number, name: string) {
    this.userService
      .deleteUser(this.user.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getUsers(this.pag.curr);
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Пользователь удалён',
            detail: this.user.secondName
          });
        }
      );
  }

  editUserRole(id: number, role: string) {
    this.userService
      .editUserRole(this.user.id, this.user.roleChange)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getUsers(this.pag.curr);
          this.dialogRole = false;
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Роль обновленна',
            // detail: this.user.role
            detail: 'Роль обновленна'
          });
        }
      );
  }

  blockUser(id: number) {
    this.userService
      .blockUser(this.user.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getUsers(this.pag.curr);
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Пользователь заблокирован',
            detail: this.user.secondName
          });
        }
      );
  }

  unBlockUser(id: number) {
    this.userService
      .unBlockUser(this.user.id)
      .subscribe(
        data => {
          this.resCRUD = data[0].json;
        },
        err => console.error(err),
        () => {
          this.getUsers(this.pag.curr);
          this.msgs = [];
          this.msgs.push({
            severity: 'info',
            summary: 'Пользователь разблокирован',
            detail: this.user.secondName
          });
        }
      );
  }

}

export interface User {
  id ? : number;
  role ? : string;
  userName ? : string;
  email ? : string;
  phone ? : string;
  phones ? : string;
  firstName ? : string;
  secondName ? : string;
  patronymic ? : string;
  defaultAddress ? : string;
  password ? : string;
  roleChange ? : string;
}

class NewUser implements User {
  constructor(public id ? : number, public role ? : string, public userName ? : string, public email ? : string, public phone ? : string,
    public phones ? : string, public firstName ? : string, public secondName ? : string,
    public patronymic ? : string, public defaultAddress ? : string, public password ? : string, public roleChange ? : string) {}
}

export interface Search {
  complete ? : string;
    result ? : string[];
}

class SearchAreas implements Search {
  constructor(public complete ? : string, public result ? : string[]) {}
}

export interface Paginate {
  count ? : string[];
    curr: number;
}

class NewPaginate implements Paginate {
  constructor(public count ?: string[], public curr = 1) {}
}
