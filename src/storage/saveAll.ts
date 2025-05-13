import { FILE_PATH } from "../config/config";
import { EnsureFileReady } from "../utils/ensureFileReady";
import { Contact } from "../types/contact";
import { SafeWriteFile } from "./write";

export function SaveAllContacts(contacts: Contact[]): void {
  EnsureFileReady(FILE_PATH);
  SafeWriteFile(FILE_PATH, JSON.stringify(contacts, null, 2));
}
