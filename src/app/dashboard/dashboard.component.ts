import {
  Component,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import {
  JwtHelper
} from 'angular2-jwt';

import {
  DashboardService
} from './dashboard.service';

import {
  Message
} from 'primeng/components/common/api';

declare var Ultima: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    DashboardService
  ]
})

export class DashboardComponent implements AfterViewInit {

  layoutCompact: boolean = true;

  layoutMode: string = 'static';

  darkMenu: boolean = false;

  profileMode: string = 'inline';

  jwtHelper: JwtHelper = new JwtHelper();

  token: string;

  role: string;

  messages: any[] = [];
  msgs: Message[];
  message: Msgs = new NewMsgs();

  constructor(private el: ElementRef, private dashboardService: DashboardService) {}

  ngAfterViewInit() {
    Ultima.init(this.el.nativeElement);
    this.getToken();
    this.socketMsgs();
  }

  changeTheme(event, theme) {
    let themeLink: HTMLLinkElement = < HTMLLinkElement > document.getElementById('theme-css');
    let layoutLink: HTMLLinkElement = < HTMLLinkElement > document.getElementById('layout-css');

    themeLink.href = 'assets/theme/theme-' + theme + '.css';
    layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    event.preventDefault();
  }

  getToken() {
    this.token = localStorage.getItem('id_token');
    this.role = this.jwtHelper.decodeToken(this.token).rol;
  }

  socketMsgs() {
    this.dashboardService
      .socketMsgs()
      .subscribe(
        message => {
          if (message) {
              this.message = message[0];
              this.msgs = [];
              this.msgs.push({
                severity: 'info',
                summary: this.message.senderRole,
                detail: this.message.text
              });
              this.message = new NewMsgs();
          }
        },
        err => console.log(err)
      );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('id_token');
  }

}

export interface Msgs {
  senderRole ? : string;
  text ? : string;
}

class NewMsgs implements Msgs {
  constructor(senderRole = '', text = '') {}
}
