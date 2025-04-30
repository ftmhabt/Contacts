import { readFileSync } from "fs";
import { FILE_PATH } from "../config";
import { log } from "@clack/prompts";
import { EnsureFileReady } from "./ensure-file-ready";
import { SafeWriteFile } from "./write";

export function LoadData(): {
  name: string;
  phone: string;
}[] {
  EnsureFileReady(FILE_PATH);

  try {
    const data = readFileSync(FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
    else throw new Error();
  } catch {
    log.error("Data file is corrupted.");
    SafeWriteFile(FILE_PATH, "[]");
    log.info("New file created to replace corrupted one.");
  }
  return [];
}
