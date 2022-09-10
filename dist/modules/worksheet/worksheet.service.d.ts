import { Transaction, TransactionChild } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AccountDto, TransactionDto } from './worksheet.dto';
export declare class WorksheetServices {
    private table;
    constructor(table: PrismaService);
    createTransaction(transactionDto: TransactionDto): Promise<{
        transaction: Transaction;
        transactionChild: any;
    }>;
    createAccount(accountDto: AccountDto): Promise<any>;
    getAccount(): Promise<any>;
    getTrialBalance(): Promise<{
        trial_balance: import("./lib").Balance[];
        account: any;
    }>;
    getTransaction(): Promise<Transaction[]>;
    toNominalString(transaction: (Transaction & {
        data: TransactionChild[];
    })[]): {
        data: any[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        type: import(".prisma/client").TransactionType;
    }[];
    isBalance(transactionDto: TransactionDto): boolean;
}
