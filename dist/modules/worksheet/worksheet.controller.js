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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksheetController = void 0;
const common_1 = require("@nestjs/common");
const hooks_1 = require("../../helpers/hooks");
const worksheet_dto_1 = require("./worksheet.dto");
const worksheet_service_1 = require("./worksheet.service");
let WorksheetController = class WorksheetController {
    constructor(worksheetServices) {
        this.worksheetServices = worksheetServices;
    }
    async createTransaction(transactionDto) {
        const result = await this.worksheetServices.createTransaction(transactionDto);
        return (0, hooks_1.useResponse)(true, 'berhasil menambahkan transaksi', result);
    }
    async createAccount(accountDto) {
        const result = await this.worksheetServices.createAccount(accountDto);
        return (0, hooks_1.useResponse)(true, 'berhasil menambahkan account', result);
    }
    async trialBalance() {
        const result = await this.worksheetServices.getTrialBalance();
        return (0, hooks_1.useResponse)(true, 'trial balance', result);
    }
};
__decorate([
    (0, common_1.Post)('transaction/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [worksheet_dto_1.TransactionDto]),
    __metadata("design:returntype", Promise)
], WorksheetController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Post)('account/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [worksheet_dto_1.AccountDto]),
    __metadata("design:returntype", Promise)
], WorksheetController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)('trial-balance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorksheetController.prototype, "trialBalance", null);
WorksheetController = __decorate([
    (0, common_1.Controller)('worksheet'),
    __metadata("design:paramtypes", [worksheet_service_1.WorksheetServices])
], WorksheetController);
exports.WorksheetController = WorksheetController;
//# sourceMappingURL=worksheet.controller.js.map