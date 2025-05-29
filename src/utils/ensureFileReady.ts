import { log } from "@clack/prompts";
import { accessSync, constants, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { SafeWriteFile } from "./safeWrite";

function ensureDirectoryExists(path: string) {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function ensureFileExists(path: string, fallbackContent: string) {
  if (!existsSync(path)) {
    SafeWriteFile(path, fallbackContent);
    return true;
  }
  try {
    accessSync(path, constants.R_OK | constants.W_OK);
    return false;
  } catch {
    SafeWriteFile(path, fallbackContent);
    return true;
  }
}

export function EnsureFileReady(path: string, fallbackContent = "[]") {
  try {
    ensureDirectoryExists(path);
    const fileCreated = ensureFileExists(path, fallbackContent);
    if (fileCreated) log.info("No data file found. New file created.");
  } catch {
    log.error("Failed to ensure file is ready.");
  }
}
