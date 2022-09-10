export declare const useResponse: (succes: boolean, message: string, data?: any) => {
    succes: boolean;
    message: string;
    data: any;
} | {
    succes: boolean;
    message: string;
    data?: undefined;
};
export declare const useLog: (data: any, title?: string, end_note?: string, theLog?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}) => void;
