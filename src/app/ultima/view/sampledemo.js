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
var countryservice_1 = require('../service/countryservice');
var nodeservice_1 = require('../service/nodeservice');
var SampleDemo = (function () {
    function SampleDemo(carService, countryService, nodeService) {
        this.carService = carService;
        this.countryService = countryService;
        this.nodeService = nodeService;
        this.checkboxValues = [];
        this.selectedMultiSelectCars = [];
    }
    SampleDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        this.carService.getCarsLarge().then(function (cars) { return _this.carsLarge = cars; });
        this.nodeService.getFiles().then(function (files) { return _this.filesTree = files; });
        this.carService.getCarsSmall().then(function (cars) { return _this.sourceCars = cars; });
        this.targetCars = [];
        this.carService.getCarsSmall().then(function (cars) { return _this.orderListCars = cars; });
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.splitButtonItems = [
            { label: 'Update', icon: 'ui-icon-update' },
            { label: 'Delete', icon: 'ui-icon-close' },
            { label: 'Home', icon: 'ui-icon-home', url: 'http://www.primefaces.org/primeng' }
        ];
        this.carOptions = [];
        this.carOptions.push({ label: 'Audi', value: 'Audi' });
        this.carOptions.push({ label: 'BMW', value: 'BMW' });
        this.carOptions.push({ label: 'Fiat', value: 'Fiat' });
        this.carOptions.push({ label: 'Ford', value: 'Ford' });
        this.carOptions.push({ label: 'Honda', value: 'Honda' });
        this.carOptions.push({ label: 'Jaguar', value: 'Jaguar' });
        this.carOptions.push({ label: 'Mercedes', value: 'Mercedes' });
        this.carOptions.push({ label: 'Renault', value: 'Renault' });
        this.carOptions.push({ label: 'VW', value: 'VW' });
        this.carOptions.push({ label: 'Volvo', value: 'Volvo' });
        this.types = [];
        this.types.push({ label: 'Apartment', value: 'Apartment' });
        this.types.push({ label: 'House', value: 'House' });
        this.types.push({ label: 'Studio', value: 'Studio' });
        this.menuItems = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'ui-icon-plus' },
                    { label: 'Open', icon: 'ui-icon-open-in-browser' }
                ]
            },
            {
                label: 'Edit',
                items: [
                    { label: 'Undo', icon: 'ui-icon-undo' },
                    { label: 'Redo', icon: 'ui-icon-redo' }
                ]
            }];
        this.panelMenuItems = [
            {
                label: 'File',
                icon: 'ui-icon-insert-drive-file',
                items: [{
                        label: 'New',
                        icon: 'ui-icon-add',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'ui-icon-edit',
                items: [
                    { label: 'Undo', icon: 'ui-icon-undo' },
                    { label: 'Redo', icon: 'ui-icon-redo' }
                ]
            },
            {
                label: 'Help',
                icon: 'ui-icon-help-outline',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'ui-icon-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ] }
                ]
            },
            {
                label: 'Actions',
                icon: 'ui-icon-settings',
                items: [
                    {
                        label: 'Edit',
                        icon: 'ui-icon-edit',
                        items: [
                            { label: 'Save', icon: 'ui-icon-save' },
                            { label: 'Update', icon: 'ui-icon-update' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'ui-icon-list',
                        items: [
                            { label: 'Delete', icon: 'ui-icon-delete' }
                        ]
                    }
                ]
            }
        ];
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
    };
    SampleDemo.prototype.filterCountry = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountries = _this.searchCountry(query, countries);
        });
    };
    SampleDemo.prototype.searchCountry = function (query, countries) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        var filtered = [];
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    };
    SampleDemo = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/sampledemo.html'
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService, countryservice_1.CountryService, nodeservice_1.NodeService])
    ], SampleDemo);
    return SampleDemo;
}());
exports.SampleDemo = SampleDemo;
//# sourceMappingURL=sampledemo.js.map