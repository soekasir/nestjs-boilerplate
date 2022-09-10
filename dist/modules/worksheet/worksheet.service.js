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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksheetServices = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const lib_1 = require("./lib");
let WorksheetServices = class WorksheetServices {
    constructor(table) {
        this.table = table;
    }
    async createTransaction(transactionDto) {
        if (!this.isBalance(transactionDto)) {
            throw new common_1.BadRequestException('transaction not balance');
        }
        try {
            const input_transaction = {
                note: transactionDto.note,
                journal: transactionDto.journal,
                transactionAt: new Date(transactionDto.transactionAt),
            };
            const transaction = await this.table.transaction.create({
                data: input_transaction,
            });
            const dataTransactionChild = transactionDto.data.map((data) => {
                return Object.assign({ transaction_id: transaction.id }, data);
            });
            const transactionChild = await this.table.transactionChild.createMany({
                data: dataTransactionChild,
            });
            return {
                transaction,
                transactionChild,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('normal balance either debet or credit');
        }
    }
    async createAccount(accountDto) {
        try {
            return await this.table.account.create({ data: accountDto });
        }
        catch (error) {
            throw new common_1.BadRequestException('account code should unique');
        }
    }
    async getAccount() {
        return await this.table.account.findMany({
            where: {
                deletedAt: null,
            },
        });
    }
    async getTrialBalance() {
        const transaction = await this.getTransaction();
        const account = await this.getAccount();
        const worksheet = new lib_1.Worksheet(account);
        worksheet.bulkTransaction(transaction);
        return {
            trial_balance: worksheet.trial_balance.toArray(),
            account: account,
        };
    }
    async getTransaction() {
        let transaction = await this.table.transaction.findMany({
            include: {
                data: {
                    include: {
                        transaction: true,
                    },
                },
            },
            where: {
                deletedAt: null,
            },
        });
        return (transaction = transaction.filter((transaction) => {
            return transaction.data[0] ? true : false;
        }));
    }
    toNominalString(transaction) {
        return transaction.map((transaction) => {
            const data = transaction.data.map((data) => {
                const str_nominal = data.nominal.toString();
                delete data.nominal;
                return Object.assign(Object.assign({}, data), { nominal: str_nominal });
            });
            delete transaction.data;
            return Object.assign(Object.assign({}, transaction), { data });
        });
    }
    isBalance(transactionDto) {
        let debet = 0, credit = 0;
        transactionDto.data.forEach((t) => {
            if (t.balance === client_1.Balance_side.debet)
                debet += t.nominal;
            if (t.balance === client_1.Balance_side.credit)
                credit += t.nominal;
        });
        return debet === credit;
    }
};
WorksheetServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorksheetServices);
exports.WorksheetServices = WorksheetServices;
//# sourceMappingURL=worksheet.service.js.map