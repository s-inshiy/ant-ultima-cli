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
var nodeservice_1 = require('../service/nodeservice');
var eventservice_1 = require('../service/eventservice');
var DataDemo = (function () {
    function DataDemo(carService, eventService, nodeService) {
        this.carService = carService;
        this.eventService = eventService;
        this.nodeService = nodeService;
    }
    DataDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsMedium().then(function (cars) { return _this.cars = cars; });
        this.carService.getCarsMedium().then(function (cars) { return _this.sourceCars = cars; });
        this.targetCars = [];
        this.carService.getCarsSmall().then(function (cars) { return _this.orderListCars = cars; });
        this.nodeService.getFilesystem().then(function (files) { return _this.files1 = files; });
        this.nodeService.getFiles().then(function (files) { return _this.files2 = files; });
        this.eventService.getEvents().then(function (events) { _this.events = events; });
        this.carouselCars = [
            { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
            { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
            { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
            { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
            { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
            { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
            { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
            { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
            { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
        ];
        this.scheduleHeader = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    };
    DataDemo = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/datademo.html',
            styles: ["                \n        .cars-datalist ul {\n            margin: 0;\n            padding: 0;\n        }\n    \n        @media (max-width:640px) {\n            .cars-datalist .text-column {\n                text-align: center;\n            }\n        }\n    "],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService, eventservice_1.EventService, nodeservice_1.NodeService])
    ], DataDemo);
    return DataDemo;
}());
exports.DataDemo = DataDemo;
//# sourceMappingURL=datademo.js.map