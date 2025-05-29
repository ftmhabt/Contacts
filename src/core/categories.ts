import {
  getCategoryList,
  saveCategoryList,
} from "../services/categoryRepository";
import { select, text, log, isCancel } from "@clack/prompts";
import { getContacts, saveContacts } from "../services/contactRepository";

export async function ManageCategories(): Promise<void> {
  const action = await select({
    message: "Manage Categories:",
    options: [
      { label: "Add Category", value: "add" },
      { label: "Rename Category", value: "rename" },
      { label: "Delete Category", value: "delete" },
      { label: "Back to Main Menu", value: "back" },
    ],
  });

  let categories = getCategoryList();

  if (action === "add") {
    const newCat = (await text({
      message: "Enter new category name:",
    })) as string;
    if (!newCat) return;

    const trimmed = newCat.trim().toLowerCase();
    if (!trimmed || categories.includes(trimmed)) {
      log.info("Category already exists or is invalid.");
      return;
    }

    saveCategoryList([...categories, trimmed]);
    log.success(`Added category: ${trimmed}`);
  }

  if (action === "rename") {
    if (categories.length === 0) {
      log.message("No categories to rename.");
      return;
    }

    const oldCat = (await select({
      message: "Select a category to rename:",
      options: categories.map((c) => ({ label: c, value: c })),
    })) as string;

    const newCat = (await text({
      message: `Enter new name for "${oldCat}":`,
    })) as string;

    if (!newCat || categories.includes(newCat)) {
      log.info("Name is invalid or already exists.");
      return;
    }

    categories = categories.map((c) => (c === oldCat ? newCat : c));
    saveCategoryList(categories);
    log.success(`Renamed "${oldCat}" to "${newCat}"`);

    const contacts = getContacts();
    const updatedContacts = contacts.map((contact) => ({
      ...contact,
      categories: Array.isArray(contact.categories)
        ? contact.categories.map((c) => (c === oldCat ? newCat : c))
        : [],
    }));

    saveContacts(updatedContacts);
  }

  if (action === "delete") {
    if (categories.length === 0) {
      log.message("No categories to delete.");
      return;
    }

    const toDelete = (await select({
      message: "Select a category to delete:",
      options: categories.map((c) => ({ label: c, value: c })),
    })) as string;

    saveCategoryList(categories.filter((c) => c !== toDelete));
    log.success(`Deleted category: ${toDelete}`);

    const contacts = getContacts();
    const updatedContacts = contacts.map((contact) => ({
      ...contact,
      categories: Array.isArray(contact.categories)
        ? contact.categories.filter((c) => c !== toDelete)
        : [],
    }));

    saveContacts(updatedContacts);
  }
}
