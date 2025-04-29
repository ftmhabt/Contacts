import { existsSync, readFileSync } from "fs";
import { FILE_PATH } from "../config";
import { log } from "@clack/prompts";

export function LoadData(): {
  name: string;
  phone: string;
}[] {
  if (existsSync(FILE_PATH)) {
    const data = readFileSync(FILE_PATH, "utf-8");
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      log.error("file corrupted");
      log.info("new file created");
    }
  }
  return [];
}
