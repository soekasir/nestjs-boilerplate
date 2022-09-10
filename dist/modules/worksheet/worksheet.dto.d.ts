import { Account_type, Balance_side } from '@prisma/client';
import { Journal } from './lib';
export declare type Account_code = string;
export declare type Account_id = string;
export declare type Transaction_id = string;
export declare class TransactionChildDto {
    account_id: Account_id;
    balance: Balance_side;
    nominal: number;
}
export declare class TransactionDto {
    note?: string;
    journal: Journal;
    transactionAt: number;
    data: TransactionChildDto[];
}
export declare class AccountDto {
    account_name: string;
    account_code: Account_code;
    normal_balance: Balance_side;
    account_type: Account_type;
}
