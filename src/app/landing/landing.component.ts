import {
  Component,
  OnInit
} from '@angular/core';

import {
  PageScrollConfig
} from 'ng2-page-scroll';

declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  partners: any;

  constructor() {}

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
    // Toggle Card
    $(function () {
      let card,
        cardActive,
        btnMore = $('.button-read-more');

      // if (card) {
      //   card.clickOutsideThisElement(function () {
      //     if (cardActive) {
      //       cardActive.removeClass('card--active');
      //     }
      //   });
      // }

      btnMore.hover(function(){
        card = $(this).parent().parent().parent().parent();
        card.toggleClass('card--shadow');
      });

      btnMore.click(function () {
        cardActive = $('#services').find('.card--active');
        card = $(this).parent().parent().parent().parent();
        if (cardActive) {
          cardActive.removeClass('card--active');
        }
        card.toggleClass('card--active');
      });

      $('.button-close-card').click(function () {
        $(this).parent().parent().parent().parent().toggleClass('card--active');
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
  }


}
