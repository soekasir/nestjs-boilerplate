import { Maps } from '../helpers';
import { Account, Account_id, Balance, GeneralLedger, Journal, Transaction } from '../type';
export declare class ChartOfAccount {
    protected datas: Maps<string, Account>;
    constructor(data?: Account[]);
    get(Account_id: Account_id): Account;
    has(Account_id: Account_id): boolean;
    get data(): Account[];
}
declare class GeneralLedgerAdapter {
    protected datas: Maps<string, GeneralLedger>;
    constructor(data?: GeneralLedger[]);
    load(data: GeneralLedger[]): void;
    bulkTransactions(transactions: Transaction[], callback?: () => void): void;
    transaction(transaction: Transaction, callback?: () => void): void;
    get(account_id: Account_id): GeneralLedger;
    has(account_id: Account_id): boolean;
    get data(): GeneralLedger[];
}
export declare class Worksheet {
    general_ledger: GeneralLedgerAdapter;
    coa: ChartOfAccount;
    constructor(coa?: Account[] | ChartOfAccount);
    newGeneralLedger(general_ledgers: GeneralLedger[]): void;
    transaction(transaction: Transaction, callback?: () => void): void;
    bulkTransaction(transactions: Transaction[], callback?: () => void): void;
    getJournal(journal: Journal): Maps<string, Transaction>;
    get trial_balance(): Maps<string, Balance>;
    get income_statement(): Maps<string, Balance>;
    get balance(): Maps<string, Balance>;
}
export {};
