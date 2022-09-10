"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBalance = exports.Maps = void 0;
const type_1 = require("../type");
class Maps extends Map {
    constructor() {
        super(...arguments);
        this.toArray = () => {
            return Array.from(this, ([key, data]) => data);
        };
        this.fromArray = (array) => {
            array.forEach(arr => {
                this.set(arr.key, arr.data);
            });
        };
    }
}
exports.Maps = Maps;
const isBalance = (transaction) => {
    let debet = 0, credit = 0;
    transaction.data.forEach(t => {
        if (t.balance === type_1.Balance_side.debet)
            debet += t.nominal;
        if (t.balance === type_1.Balance_side.credit)
            credit += t.nominal;
    });
    return debet === credit;
};
exports.isBalance = isBalance;
//# sourceMappingURL=index.js.map