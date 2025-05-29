import { App } from "./cli/app";
import { initCategories } from "./services/categoryRepository";
import { initContacts } from "./services/contactRepository";

try {
  initContacts();
  initCategories();
  App();
} catch (err) {}
