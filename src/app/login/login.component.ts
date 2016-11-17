import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  Message
} from 'primeng/primeng';

import {
  JwtHelper
} from 'angular2-jwt';

import {
  LoginService
} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    LoginService
  ]
})

export class LoginComponent implements OnInit {

  // Classes
  user: User = new NewUser();
  jwtHelper: JwtHelper = new JwtHelper();

  resCRUD: any;
  msgs: Message[] = [];
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.logout();
  }

  login() {
    this.loading = true;
    this.loginService.login(this.user.login, this.user.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/dashboard/bids']);
        } else {
          this.loading = false;
          this.msgs = [];
          this.msgs.push({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Неправильный логин или пароль'
          });
        }
      });
  }

  // keyDownFunction(event) {
  //   if (event.keyCode == 13) {
  //     alert('you just clicked enter');
  //   }
  // }

}

export interface User {
  login ? : string;
  password ? : string;
}

class NewUser implements User {
  constructor(login ? : string, password ? : string) {}
}
