"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const tools_1 = __importDefault(require("./tools"));
const config_1 = __importDefault(require("./utils/config"));
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "squadcast-mcp-server",
    version: "0.1.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
(0, tools_1.default)(server);
// Start server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.log("Squadcast MCP Server running on stdio");
    console.log("Config:", await (0, config_1.default)());
}
try {
    main();
}
catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
}
