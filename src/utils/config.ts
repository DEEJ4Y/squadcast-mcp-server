import fs from "fs/promises";
import logger from "./logger";
const getConfig = async () => {
  try {
    const configPath = process.argv[1].includes("/")
      ? process.argv[1].split("/").slice(0, -1).join("/") + "/../config.json"
      : process.argv[1].includes("\\")
      ? process.argv[1].split("\\").slice(0, -1).join("\\") +
        "\\..\\config.json"
      : "config.json";

    logger.info("Config path:", configPath);

    const configFile = await fs.readFile(configPath, "utf-8");

    const config = JSON.parse(configFile);

    return config;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export default getConfig;
