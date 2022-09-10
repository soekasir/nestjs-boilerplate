import { AccountDto, TransactionDto } from './worksheet.dto';
import { WorksheetServices } from './worksheet.service';
export declare class WorksheetController {
    private worksheetServices;
    constructor(worksheetServices: WorksheetServices);
    createTransaction(transactionDto: TransactionDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    createAccount(accountDto: AccountDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    trialBalance(): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
}
