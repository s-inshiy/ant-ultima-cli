import {
  Component,
  AfterViewInit,
  ElementRef
} from '@angular/core';

declare var Ultima: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements AfterViewInit {

  layoutCompact: boolean = true;

  layoutMode: string = 'static';

  darkMenu: boolean = false;

  profileMode: string = 'inline';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    Ultima.init(this.el.nativeElement);
  }

  changeTheme(event, theme) {
    let themeLink: HTMLLinkElement = < HTMLLinkElement > document.getElementById('theme-css');
    let layoutLink: HTMLLinkElement = < HTMLLinkElement > document.getElementById('layout-css');

    themeLink.href = 'assets/theme/theme-' + theme + '.css';
    layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    event.preventDefault();
  }
}
