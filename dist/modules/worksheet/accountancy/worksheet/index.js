"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worksheet = exports.ChartOfAccount = void 0;
const helpers_1 = require("../helpers");
const type_1 = require("../type");
class ChartOfAccount {
    constructor(data) {
        this.datas = new helpers_1.Maps();
        const array = data === null || data === void 0 ? void 0 : data.map(account => {
            return { key: account.id, data: account };
        });
        array && this.datas.fromArray(array);
    }
    get(Account_id) {
        return this.datas.get(Account_id);
    }
    has(Account_id) {
        return this.datas.has(Account_id);
    }
    get data() {
        return this.datas.toArray();
    }
}
exports.ChartOfAccount = ChartOfAccount;
class GeneralLedgerAdapter {
    constructor(data) {
        this.datas = new helpers_1.Maps();
        if (data)
            this.load(data);
    }
    load(data) {
        const array = data === null || data === void 0 ? void 0 : data.map(general_ledger => {
            return { key: general_ledger.account_id, data: general_ledger };
        });
        array && this.datas.fromArray(array);
    }
    bulkTransactions(transactions, callback) {
        transactions.forEach(transaction => {
            if (!(0, helpers_1.isBalance)(transaction)) {
                throw new Error('transaction not balance');
            }
        });
        transactions.forEach(transaction => {
            this.transaction(transaction);
        });
        if (callback)
            callback();
    }
    transaction(transaction, callback) {
        if (!(0, helpers_1.isBalance)(transaction)) {
            throw new Error('transaction not balance');
        }
        transaction.data.forEach(transaction_child => {
            const general_ledger = this.datas.get(transaction_child.account_id);
            if (general_ledger) {
                general_ledger.transactions.push(transaction_child);
                this.datas.set(general_ledger.account_id, general_ledger);
            }
            else {
                this.datas.set(transaction_child.account_id, {
                    account_id: transaction_child.account_id,
                    transactions: [transaction_child],
                });
            }
        });
        if (callback)
            callback();
    }
    get(account_id) {
        return this.datas.get(account_id);
    }
    has(account_id) {
        return this.datas.has(account_id);
    }
    get data() {
        return this.datas.toArray();
    }
}
class Worksheet {
    constructor(coa) {
        this.general_ledger = new GeneralLedgerAdapter();
        if (coa instanceof ChartOfAccount) {
            this.coa = coa;
        }
        else if (Array.isArray(coa)) {
            this.coa = new ChartOfAccount(coa);
        }
        else {
            this.coa = new ChartOfAccount();
        }
    }
    newGeneralLedger(general_ledgers) {
        this.general_ledger = new GeneralLedgerAdapter(general_ledgers);
    }
    transaction(transaction, callback) {
        this.general_ledger.transaction(transaction, callback);
    }
    bulkTransaction(transactions, callback) {
        this.general_ledger.bulkTransactions(transactions, callback);
    }
    getJournal(journal) {
        const result_journal = new helpers_1.Maps();
        this.general_ledger.data.forEach(general_ledger => {
            general_ledger.transactions.forEach(transaction_child => {
                if (transaction_child.transaction.journal === journal) {
                    if (result_journal.has(transaction_child.transaction_id)) {
                        const transaction = result_journal.get(transaction_child.transaction_id);
                        transaction &&
                            transaction.data.push(transaction_child) &&
                            result_journal.set(transaction_child.transaction_id, transaction);
                    }
                    else {
                        result_journal.set(transaction_child.transaction_id, {
                            id: transaction_child.transaction_id,
                            journal: transaction_child.transaction.journal,
                            createdAt: transaction_child.transaction.createdAt,
                            updatedAt: transaction_child.transaction.updatedAt,
                            data: [transaction_child],
                        });
                    }
                }
            });
        });
        return result_journal;
    }
    get trial_balance() {
        const result_trial_balance = new helpers_1.Maps();
        this.general_ledger.data.forEach(general_ledger => {
            let debet = 0, credit = 0;
            general_ledger.transactions.forEach(transaction_child => {
                if (transaction_child.balance === type_1.Balance_side.credit)
                    credit += transaction_child.nominal;
                if (transaction_child.balance === type_1.Balance_side.debet)
                    debet += transaction_child.nominal;
            });
            result_trial_balance.set(general_ledger.account_id, {
                account_id: general_ledger.account_id,
                debet: debet,
                credit: credit,
            });
        });
        return result_trial_balance;
    }
    get income_statement() {
        const result_income_statement = new helpers_1.Maps();
        this.trial_balance.forEach(balance => {
            var _a;
            if (((_a = this.coa.get(balance.account_id)) === null || _a === void 0 ? void 0 : _a.account_type) === type_1.Account_type.nominal) {
                result_income_statement.set(balance.account_id, balance);
            }
        });
        return result_income_statement;
    }
    get balance() {
        const result_balance = new helpers_1.Maps();
        this.trial_balance.forEach(balance => {
            var _a;
            if (((_a = this.coa.get(balance.account_id)) === null || _a === void 0 ? void 0 : _a.account_type) === type_1.Account_type.real) {
                result_balance.set(balance.account_id, balance);
            }
        });
        return result_balance;
    }
}
exports.Worksheet = Worksheet;
//# sourceMappingURL=index.js.map