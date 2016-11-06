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
var MiscDemo = (function () {
    function MiscDemo() {
        this.value = 0;
    }
    MiscDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.value = _this.value + Math.floor(Math.random() * 10) + 1;
            if (_this.value >= 100) {
                _this.value = 100;
                clearInterval(_this.interval);
                _this.interval = null;
            }
        }, 2000);
        this.images = [];
        this.images.push({ source: 'assets/demo/images/nature/nature1.jpg', alt: 'Description for Image 1', title: 'Title 1' });
        this.images.push({ source: 'assets/demo/images/nature/nature2.jpg', alt: 'Description for Image 2', title: 'Title 2' });
        this.images.push({ source: 'assets/demo/images/nature/nature3.jpg', alt: 'Description for Image 3', title: 'Title 3' });
        this.images.push({ source: 'assets/demo/images/nature/nature4.jpg', alt: 'Description for Image 4', title: 'Title 4' });
        this.images.push({ source: 'assets/demo/images/nature/nature5.jpg', alt: 'Description for Image 5', title: 'Title 5' });
        this.images.push({ source: 'assets/demo/images/nature/nature6.jpg', alt: 'Description for Image 6', title: 'Title 6' });
        this.images.push({ source: 'assets/demo/images/nature/nature7.jpg', alt: 'Description for Image 7', title: 'Title 7' });
        this.images.push({ source: 'assets/demo/images/nature/nature8.jpg', alt: 'Description for Image 8', title: 'Title 8' });
        this.images.push({ source: 'assets/demo/images/nature/nature9.jpg', alt: 'Description for Image 9', title: 'Title 9' });
        this.images.push({ source: 'assets/demo/images/nature/nature10.jpg', alt: 'Description for Image 10', title: 'Title 10' });
        this.images.push({ source: 'assets/demo/images/nature/nature11.jpg', alt: 'Description for Image 11', title: 'Title 11' });
        this.images.push({ source: 'assets/demo/images/nature/nature12.jpg', alt: 'Description for Image 12', title: 'Title 12' });
    };
    MiscDemo.prototype.ngOnDestroy = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    MiscDemo = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/miscdemo.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MiscDemo);
    return MiscDemo;
}());
exports.MiscDemo = MiscDemo;
//# sourceMappingURL=miscdemo.js.map