import { existsSync, readFileSync } from "fs";
import { FILE_PATH } from "../config/config";

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
      console.error("file corrupted");
      console.log("new file created");
    }
  }
  return [];
}
