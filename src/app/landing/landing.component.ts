import {
  Component,
  OnInit,
  // AfterViewChecked
  // AfterContentChecked
  // AfterViewInit
} from '@angular/core';

import {
  PageScrollConfig
} from 'ng2-page-scroll';

import {
  LandingService
} from './landing.service';

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
              show: false
            });
            this.lists = [];
          }
        }
      );
  }

  isActive(index) {
    for (let i = 0; i < this.titles.length; i++) {
      this.titles[i].show = false;
    }
    this.titles[index].show = !this.titles[index].show;
  }

}
