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
var countryservice_1 = require('../service/countryservice');
var FormsDemo = (function () {
    function FormsDemo(countryService) {
        this.countryService = countryService;
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
        this.selectedMultiSelectCars = [];
        this.checkboxValues = [];
        this.rangeValues = [20, 80];
    }
    FormsDemo.prototype.ngOnInit = function () {
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
        this.cities = [];
        this.cities.push({ label: 'Select City', value: 0 });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        this.citiesListbox = this.cities.slice(1);
        this.types = [];
        this.types.push({ label: 'Apartment', value: 'Apartment' });
        this.types.push({ label: 'House', value: 'House' });
        this.types.push({ label: 'Studio', value: 'Studio' });
        this.splitButtonItems = [
            { label: 'Update', icon: 'ui-icon-update' },
            { label: 'Delete', icon: 'ui-icon-close' },
            { label: 'Home', icon: 'ui-icon-home', url: 'http://www.primefaces.org/primeng' }
        ];
    };
    FormsDemo.prototype.filterCountry = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountries = _this.searchCountry(query, countries);
        });
    };
    FormsDemo.prototype.searchCountry = function (query, countries) {
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
    FormsDemo.prototype.filterBrands = function (event) {
        this.filteredBrands = [];
        for (var i = 0; i < this.brands.length; i++) {
            var brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    };
    FormsDemo.prototype.handleACDropdownClick = function () {
        var _this = this;
        this.filteredBrands = [];
        //mimic remote call
        setTimeout(function () {
            _this.filteredBrands = _this.brands;
        }, 100);
    };
    FormsDemo = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/formsdemo.html'
        }), 
        __metadata('design:paramtypes', [countryservice_1.CountryService])
    ], FormsDemo);
    return FormsDemo;
}());
exports.FormsDemo = FormsDemo;
//# sourceMappingURL=formsdemo.js.map