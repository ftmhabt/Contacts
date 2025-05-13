import { log } from "@clack/prompts";
import { accessSync, constants, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { SafeWriteFile } from "../storage/write";

export function EnsureFileReady(path: string, defaultContent = "[]") {
  const dir = dirname(path);
  try {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  } catch {
    log.error("Failed to create directory.");
  }

  if (!existsSync(path)) {
    SafeWriteFile(path, defaultContent);
    return;
  }

  try {
    accessSync(path, constants.R_OK | constants.W_OK);
  } catch {
    SafeWriteFile(path, defaultContent);
    log.info("No data file found. New file created.");
  }
}
