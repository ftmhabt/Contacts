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
