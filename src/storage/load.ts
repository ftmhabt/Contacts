import { readFileSync } from "fs";
import { FILE_PATH } from "../config";
import { log } from "@clack/prompts";
import { EnsureFileReady } from "./ensure-file-ready";
import { SafeWriteFile } from "./write";

type Contact = {
  name: string;
  phone: string;
};

export function LoadData(): Contact[] {
  EnsureFileReady(FILE_PATH);

  try {
    const raw = readFileSync(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) throw new Error("Invalid JSON format");

    return data;
  } catch (err) {
    log.error("Failed to load data. File is corrupted or unreadable.");
    log.info("Creating a new empty contact list.");
    SafeWriteFile(FILE_PATH, "[]");
    return [];
  }
}
