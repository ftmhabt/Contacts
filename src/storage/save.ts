import { writeFileSync } from "fs";
import { FILE_PATH } from "../config/config";
import { EnsureDirectoryExists } from "./exist";

export function SaveContact(contacts: { name: string; phone: string }[]) {
  EnsureDirectoryExists(FILE_PATH);
  writeFileSync(FILE_PATH, JSON.stringify(contacts, null, 2));
}
