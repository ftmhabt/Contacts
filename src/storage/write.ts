import { writeFileSync } from "fs";
import { log } from "@clack/prompts";

export function SafeWriteFile(path: string, data: string) {
  try {
    writeFileSync(path, data, "utf-8");
  } catch {
    log.error("Failed to write contact data.");
    return;
  }
}
