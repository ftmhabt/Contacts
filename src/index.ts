import { App } from "./cli/app";
import { initCategories } from "./services/categoryRepository";
import { initContacts } from "./services/contactRepository";
import { HandleError } from "./utils";

try {
  initContacts();
  initCategories();
  App();
} catch (err) {
  HandleError(err);
}
