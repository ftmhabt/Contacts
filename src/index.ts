import { App } from "./cli/app";
import { initCategories } from "./services/categoryRepository";
import { getContacts, initContacts } from "./services/contactRepository";
import { HandleError } from "./utils";

try {
  initContacts();
  initCategories(getContacts());
  App();
} catch (err) {
  HandleError(err);
}
