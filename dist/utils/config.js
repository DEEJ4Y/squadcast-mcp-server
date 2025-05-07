"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const getConfig = async () => {
    try {
        const configPath = process.argv[1].includes("/")
            ? process.argv[1].split("/").slice(0, -1).join("/") + "/../config.json"
            : process.argv[1].includes("\\")
                ? process.argv[1].split("\\").slice(0, -1).join("\\") +
                    "\\..\\config.json"
                : "config.json";
        console.log("Config path:", configPath);
        const configFile = await promises_1.default.readFile(configPath, "utf-8");
        const config = JSON.parse(configFile);
        return config;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.default = getConfig;
