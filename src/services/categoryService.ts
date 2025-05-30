import { isCancel, log, multiselect, note } from "@clack/prompts";
import { Contact } from "../types/contact";
import {
  getCategoryList,
  saveCategoryList,
  setCategoryList,
} from "./categoryRepository";
import { getContacts, saveContacts, setContacts } from "./contactRepository";

export async function addCategory(name: string) {
  const categories = getCategoryList();
  if (!categories || categories.includes(name)) throw new Error("fjrdrf");
  await addCategoryToContacts(getContacts(), categories, name);
}

export async function addCategoryToContacts(
  contacts: Contact[],
  categories: string[],
  category: string
) {
  const selected = await multiselect({
    message: `Assign "${category}" to selected contacts:`,
    options: contacts.map((c, i) => ({
      label: `${c.name} (${c.phone})`,
      value: i.toString(),
    })),
  });

  if (!selected || isCancel(selected)) return;

  const updatedContacts = contacts.map((c, i) => {
    if (selected.includes(i.toString())) {
      return {
        ...c,
        categories: [...(c.categories || []), category],
      };
    }
    return c;
  });

  note(`✅ Category "${category}" added to ${selected.length} contact(s).`);

  saveCategoryList([...categories, category]);
  saveContacts(updatedContacts);
}
export function renameCategory(oldName: string, newName: string): void {
  const categories = getCategoryList();
  if (!categories) return;
  // if (categoryExists(newName, categories)) return;

  updateCategoryList(oldName, newName, categories);
  updateContactsCategory(oldName, newName);
}

export function deleteCategory(name: string): void {
  removeCategoryFromList(name);
  removeCategoryFromContacts(name);
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
