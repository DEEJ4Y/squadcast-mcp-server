"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTextContent = (content) => {
    return {
        content: [
            {
                type: "text",
                text: content,
            },
        ],
    };
};
exports.default = getTextContent;
