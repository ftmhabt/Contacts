import { Contact } from "../types/contact";
import { getCategoryList, saveCategoryList } from "./categoryRepository";
import { getContacts, saveContacts } from "./contactRepository";

export function addCategory(category: string): void {
  const categories = getCategoryList();
  if (!categories) return;
  saveCategoryList([...categories, category]);
}

export function renameCategory(oldName: string, newName: string): void {
  const categories = getCategoryList();
  if (!categories) return;
  if (categoryExists(newName, categories)) return;

  updateCategoryList(oldName, newName, categories);
  updateContactsCategory(oldName, newName);
}

export function deleteCategory(name: string): void {
  removeCategoryFromList(name);
  removeCategoryFromContacts(name);
}

export function categoryExists(name: string, categories: string[]): boolean {
  return categories.includes(name.trim());
}

export function updateCategoryList(
  oldName: string,
  newName: string,
  categories: string[]
): void {
  const updated = categories.map((c) => (c === oldName ? newName : c));
  saveCategoryList(updated);
}

export function updateContactsCategory(oldName: string, newName: string): void {
  const contacts = getContacts();
  const updatedContacts = contacts.map((contact) => ({
    ...contact,
    categories: Array.isArray(contact.categories)
      ? contact.categories.map((c) => (c === oldName ? newName : c))
      : [],
  }));

  saveContacts(updatedContacts);
}

export function removeCategoryFromList(name: string): void {
  const categories = getCategoryList();
  if (!categories) return;
  const updated = categories.filter((c) => c !== name);
  saveCategoryList(updated);
}

export function removeCategoryFromContacts(categoryName: string): void {
  const contacts = getContacts();

  const updatedContacts: Contact[] = contacts.map((contact) => ({
    ...contact,
    categories: Array.isArray(contact.categories)
      ? contact.categories.filter((c) => c !== categoryName)
      : [],
  }));

  saveContacts(updatedContacts);
}
