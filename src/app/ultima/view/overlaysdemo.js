"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var carservice_1 = require('../service/carservice');
var primeng_1 = require('primeng/primeng');
var OverlaysDemo = (function () {
    function OverlaysDemo(carService, confirmationService) {
        this.carService = carService;
        this.confirmationService = confirmationService;
    }
    OverlaysDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars.splice(0, 5); });
        this.images = [];
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos1.jpg', thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Nature 1' });
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos2.jpg', thumbnail: 'assets/demo/images/sopranos/sopranos2_small.jpg', title: 'Nature 2' });
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos3.jpg', thumbnail: 'assets/demo/images/sopranos/sopranos3_small.jpg', title: 'Nature 3' });
        this.images.push({ source: 'assets/demo/images/sopranos/sopranos4.jpg', thumbnail: 'assets/demo/images/sopranos/sopranos4_small.jpg', title: 'Nature 4' });
    };
    OverlaysDemo.prototype.confirm = function () {
        this.confirmationService.confirm({
            message: 'Are you sure to perform this action?'
        });
    };
    OverlaysDemo = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/overlaysdemo.html',
            providers: [primeng_1.ConfirmationService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService, primeng_1.ConfirmationService])
    ], OverlaysDemo);
    return OverlaysDemo;
}());
exports.OverlaysDemo = OverlaysDemo;
//# sourceMappingURL=overlaysdemo.js.map