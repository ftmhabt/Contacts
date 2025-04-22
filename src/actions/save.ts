import { writeFileSync } from "node:fs";
import { FILE_PATH } from "../config/config";

export function SaveContact(contacts: { name: string; phone: string }[]) {
  writeFileSync(FILE_PATH, JSON.stringify(contacts, null, 2));
}
