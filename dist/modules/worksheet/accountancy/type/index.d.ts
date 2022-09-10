export declare const Balance_side: {
    debet: string;
    credit: string;
};
export declare type Balance_side = (typeof Balance_side)[keyof typeof Balance_side];
export declare const Account_type: {
    real: string;
    nominal: string;
};
export declare type Account_type = (typeof Account_type)[keyof typeof Account_type];
export declare type Account_code = string;
export declare type Account_id = string;
export declare type Transaction_id = string;
export interface Account {
    id: Account_id;
    account_name: string;
    account_code: Account_code;
    normal_balance: Balance_side;
    account_type: Account_type;
}
export interface TransactionChild {
    id: string;
    transaction_id: Transaction_id;
    account_id: Account_id;
    balance: Balance_side;
    nominal: number;
    transaction: {
        id: Transaction_id;
        note?: string;
        journal: Journal;
        createdAt: string | Date;
        updatedAt: string | Date;
    };
}
export interface Transaction {
    id: Transaction_id;
    note?: string;
    journal: Journal;
    createdAt: string | Date;
    updatedAt: string | Date;
    data: TransactionChild[];
}
export declare const Journal: {
    general: string;
    disburstment: string;
    receipt: string;
    sales: string;
    purchase: string;
    adjustment: string;
    reverse: string;
    closed: string;
};
export declare type Journal = (typeof Journal)[keyof typeof Journal];
export interface GeneralLedger {
    account_id: Account_id;
    transactions: TransactionChild[];
}
export interface Balance {
    account_id: Account_id;
    credit: number;
    debet: number;
}
