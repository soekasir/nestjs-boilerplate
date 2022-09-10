import { Transaction } from '../type';
export declare class Maps<K, D> extends Map<K, D> {
    toArray: () => D[];
    fromArray: (array: {
        key: K;
        data: D;
    }[]) => void;
}
export declare const isBalance: (transaction: Transaction) => boolean;
