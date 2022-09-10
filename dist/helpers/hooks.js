"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLog = exports.useResponse = void 0;
const config_1 = require("../config/config");
const useResponse = (succes, message, data) => {
    if (data) {
        return {
            succes: succes,
            message: message,
            data: data,
        };
    }
    if (!data) {
        return {
            succes: succes,
            message: message,
        };
    }
};
exports.useResponse = useResponse;
const useLog = (data, title = '#', end_note = '***', theLog = console.log) => {
    if ((0, config_1.isDevelopment)()) {
        console.log(`===================================* ${title} *===================================`);
        theLog(data);
        if (end_note)
            console.log(`===================================# ${end_note} #===================================`);
    }
};
exports.useLog = useLog;
//# sourceMappingURL=hooks.js.map