import { EnsureFileReady } from "../utils";
import { SafeWriteFile } from "../utils/safeWrite";
import { CATEGORIES_FILE_PATH } from "../config/paths";
import { Contact } from "../types/contact";

let categories: string[] = [];

export function initCategories(contacts: Contact[]): void {
  categories = Array.from(new Set(contacts.flatMap((c) => c.categories || [])));
}

export function getCategoryList(): string[] {
  return categories;
}

export function setCategoryList(updated: string[]): void {
  categories = updated;
}

export function saveCategoryList(updated: string[]): void {
  setCategoryList(updated);
  EnsureFileReady(CATEGORIES_FILE_PATH);
  SafeWriteFile(CATEGORIES_FILE_PATH, JSON.stringify(updated, null, 2));
}
