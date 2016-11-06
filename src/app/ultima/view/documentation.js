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
var Documentation = (function () {
    function Documentation() {
    }
    Documentation = __decorate([
        core_1.Component({
            templateUrl: 'app/demo/view/documentation.html',
            styles: ["\n        .docs h1 {\n            margin-top: 30px;\n        }\n        \n        .docs pre {\n            font-family: monospace;\n            background-color: #0C2238;\n            color: #dddddd;\n            padding: 1em;\n            font-size: 14px;\n            border-radius: 3px;\n            overflow: auto;\n        }\n        \n        .video-container {\n            position: relative;\n            width: 100%;\n            height: 0;\n            padding-bottom: 56.25%;\n        }\n        .video-container iframe {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n        }"
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Documentation);
    return Documentation;
}());
exports.Documentation = Documentation;
//# sourceMappingURL=documentation.js.map