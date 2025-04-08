import fs from "fs/promises";
const getConfig = async () => {
  try {
    const configPath = process.argv[1].includes("/")
      ? process.argv[1].split("/").slice(0, -1).join("/") + "/../config.json"
      : process.argv[1].includes("\\")
      ? process.argv[1].split("\\").slice(0, -1).join("\\") +
        "\\..\\config.json"
      : "config.json";

    console.log("Config path:", configPath);

    const configFile = await fs.readFile(configPath, "utf-8");

    const config = JSON.parse(configFile);

    return config;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getConfig;
