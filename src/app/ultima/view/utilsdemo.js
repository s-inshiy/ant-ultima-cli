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
var UtilsDemo = (function () {
    function UtilsDemo() {
    }
    UtilsDemo = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/utilsdemo.html',
            styles: ["                \n        .icon-grid div.ui-g-12 {\n            color: #757575;\n            text-align: center;\n            padding: 16px;\n            font-size: 12px;\n        }\n        \n        .icon-grid i {\n            display: block;\n            margin: 0 auto;\n            font-size: 24px;\n        }\n        \n        pre {\n            font-family: monospace;\n            background-color: #0C2238;\n            color: #dddddd;\n            padding: 1em;\n            font-size: 14px;\n            border-radius: 3px;\n            overflow: auto;\n        }\n        \n        .shadow-box {\n            background-color: #607D8B;\n            width: 100px;\n            height: 100px;\n        }\n    "],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], UtilsDemo);
    return UtilsDemo;
}());
exports.UtilsDemo = UtilsDemo;
//# sourceMappingURL=utilsdemo.js.map