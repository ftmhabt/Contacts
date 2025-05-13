import { readFileSync } from "fs";
import { FILE_PATH } from "../config/config";
import { SafeWriteFile } from "./write";
import { Contact } from "../types/contact";
import { EnsureFileReady, HandleError } from "../utils";

export function LoadData(): Contact[] {
  EnsureFileReady(FILE_PATH);

  try {
    const raw = readFileSync(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) throw new Error("Invalid JSON format");

    return data;
  } catch (err) {
    HandleError(err);
    SafeWriteFile(FILE_PATH, "[]");
    return [];
  }
}
