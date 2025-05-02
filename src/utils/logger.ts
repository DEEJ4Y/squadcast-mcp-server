function sendLog(level: string, logger: string, data: Record<string, any>) {
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
  info: (...args: any[]) => {
    const data = args.reduce((acc, arg) => {
      if (typeof arg === "object") {
        return { ...acc, ...arg };
      }
      return acc;
    }, {});
    sendLog("info", "squadcast-mcp-server", data);
  },
  error: (...args: any[]) => {
    const data = args.reduce((acc, arg) => {
      if (typeof arg === "object") {
        return { ...acc, ...arg };
      }
      return acc;
    }, {});
    sendLog("info", "squadcast-mcp-server", data);
  },
};

export default logger;
