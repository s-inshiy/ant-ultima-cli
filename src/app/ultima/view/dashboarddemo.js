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
var eventservice_1 = require('../service/eventservice');
var DashboardDemo = (function () {
    function DashboardDemo(carService, eventService) {
        this.carService = carService;
        this.eventService = eventService;
    }
    DashboardDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        this.eventService.getEvents().then(function (events) { _this.events = events; });
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#FFC107'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#03A9F4'
                }
            ]
        };
    };
    DashboardDemo = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/dashboard.html'
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService, eventservice_1.EventService])
    ], DashboardDemo);
    return DashboardDemo;
}());
exports.DashboardDemo = DashboardDemo;
//# sourceMappingURL=dashboarddemo.js.map