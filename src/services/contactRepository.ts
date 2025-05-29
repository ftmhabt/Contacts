import { Contact } from "../types/contact";
import { EnsureFileReady, HandleError } from "../utils";
import { SafeWriteFile } from "../utils/safeWrite";
import { FILE_PATH } from "../config/paths";
import { readFileSync } from "fs";

export function loadData(): Contact[] {
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

let contacts: Contact[] = [];

export function initContacts(): void {
  contacts = loadData();
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
