"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendLog(level, logger, data) {
    const message = {
        jsonrpc: "2.0",
        method: "notifications/message",
        params: {
            level,
            logger,
            data,
        },
    };
    process.stdout.write(JSON.stringify(message) + "\n");
}
const logger = {
    info: (...args) => {
        const data = args.reduce((acc, arg) => {
            if (typeof arg === "object") {
                return { ...acc, ...arg };
            }
            return acc;
        }, {});
        sendLog("info", "squadcast-mcp-server", data);
    },
    error: (...args) => {
        const data = args.reduce((acc, arg) => {
            if (typeof arg === "object") {
                return { ...acc, ...arg };
            }
            return acc;
        }, {});
        sendLog("info", "squadcast-mcp-server", data);
    },
};
exports.default = logger;
