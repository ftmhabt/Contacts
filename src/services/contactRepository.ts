import { Contact } from "../types/contact";
import { LoadData } from "../storage/load";
import { EnsureFileReady } from "../utils";
import { SafeWriteFile } from "../storage/write";
import { FILE_PATH } from "../config/config";

let contacts: Contact[] = [];

export function initContacts(): void {
  contacts = LoadData();
}

export function getContacts(): Contact[] {
  return contacts;
}

export function setContacts(updatedContacts: Contact[]): void {
  contacts = updatedContacts;
}

export function saveContacts(updatedContacts: Contact[]): void {
  setContacts(updatedContacts);
  EnsureFileReady(FILE_PATH);
  SafeWriteFile(FILE_PATH, JSON.stringify(updatedContacts, null, 2));
}
