"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksheetModule = void 0;
const common_1 = require("@nestjs/common");
const worksheet_controller_1 = require("./worksheet.controller");
const worksheet_service_1 = require("./worksheet.service");
let WorksheetModule = class WorksheetModule {
};
WorksheetModule = __decorate([
    (0, common_1.Module)({
        controllers: [worksheet_controller_1.WorksheetController],
        providers: [worksheet_service_1.WorksheetServices],
    })
], WorksheetModule);
exports.WorksheetModule = WorksheetModule;
//# sourceMappingURL=worksheet.module.js.map