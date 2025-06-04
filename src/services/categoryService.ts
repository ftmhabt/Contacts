import { isCancel, multiselect } from "@clack/prompts";
import { Contact } from "../types/contact";
import { getCategoryList, setCategoryList } from "./categoryRepository";
import { getContacts, saveContacts } from "./contactRepository";

export async function addCategory(name: string): Promise<void> {
  const categories = getValidCategoryList();

  if (categoryExists(name, categories)) {
    throw new Error(`Category "${name}" already exists.`);
  }

  setCategoryList([...categories, name]);

  const contacts = getContacts();
  const selectedContactIndexes = await selectContactsToAssign(contacts, name);
  if (!selectedContactIndexes) return;

  const updatedContacts = assignCategoryToSelectedContacts(
    contacts,
    selectedContactIndexes,
    name
  );
  saveContacts(updatedContacts);
}

export async function selectContactsToAssign(
  contacts: Contact[],
  category: string
): Promise<string[] | null> {
  const selection = await multiselect({
    message: `Assign "${category}" to selected contacts:`,
    options: contacts.map((contact, index) => ({
      label: `${contact.name} (${contact.phone})`,
      value: index.toString(),
    })),
  });

  if (!selection || isCancel(selection)) {
    return null;
  }

  return selection;
}

export function assignCategoryToSelectedContacts(
  contacts: Contact[],
  selectedIndexes: string[],
  category: string
): Contact[] {
  return contacts.map((contact, index) =>
    selectedIndexes.includes(index.toString())
      ? {
          ...contact,
          categories: Array.from(
            new Set([...(contact.categories || []), category])
          ),
        }
      : contact
  );
}

export function renameCategory(oldName: string, newName: string): void {
  const categories = getValidCategoryList();

  if (categoryExists(newName, categories)) {
    throw new Error(`Category "${newName}" already exists.`);
  }

  const updatedCategories = renameCategoryInList(categories, oldName, newName);
  setCategoryList(updatedCategories);

  const contacts = getContacts();
  const updatedContacts = renameCategoryInContacts(contacts, oldName, newName);
  saveContacts(updatedContacts);
}

function categoryExists(name: string, categories: string[]): boolean {
  return categories.some((c) => c.toLowerCase() === name.toLowerCase());
}

export function renameCategoryInList(
  categories: string[],
  oldName: string,
  newName: string
): string[] {
  return categories.map((c) => (c === oldName ? newName : c));
}

export function renameCategoryInContacts(
  contacts: Contact[],
  oldName: string,
  newName: string
): Contact[] {
  return contacts.map((contact) => ({
    ...contact,
    categories: Array.isArray(contact.categories)
      ? contact.categories.map((c) => (c === oldName ? newName : c))
      : [],
  }));
}

export function deleteCategory(name: string): void {
  const categories = getValidCategoryList();

  const updatedCategories = removeCategoryFromList(categories, name);
  setCategoryList(updatedCategories);

  const contacts = getContacts();
  const updatedContacts = removeCategoryFromContacts(contacts, name);
  saveContacts(updatedContacts);
}

export function removeCategoryFromList(
  categories: string[],
  name: string
): string[] {
  return categories.filter((c) => c !== name);
}

export function removeCategoryFromContacts(
  contacts: Contact[],
  categoryName: string
): Contact[] {
  return contacts.map((contact) => ({
    ...contact,
    categories: Array.isArray(contact.categories)
      ? contact.categories.filter((c) => c !== categoryName)
      : [],
  }));
}

function getValidCategoryList(): string[] {
  const categories = getCategoryList();
  if (!categories) throw new Error("Failed to retrieve existing categories.");
  return categories;
}
