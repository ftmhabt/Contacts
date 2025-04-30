import { FILE_PATH } from "../config";
import { EnsureFileReady } from "./ensure-file-ready";
import { Contact } from "../types";
import { SafeWriteFile } from "./write";

export function SaveAllContacts(contacts: Contact[]): void {
  EnsureFileReady(FILE_PATH);
  SafeWriteFile(FILE_PATH, JSON.stringify(contacts, null, 2));
}
