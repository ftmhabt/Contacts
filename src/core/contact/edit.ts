import { log } from "@clack/prompts";
import { getContacts } from "../../services/contactRepository";
import { promptEditedContact } from "../../cli/contact/promptEditContact";
import { editContact } from "../../services/contactService";
import { HandleError } from "../../utils";

export async function Edit(): Promise<void> {
  try {
    const contacts = getContacts();

    const result = await promptEditedContact(contacts);
    if (!result) {
      log.warn("Edit cancelled.");
      return;
    }

    const { index, updatedContact } = result;
    editContact(index, updatedContact);
    log.success("Contact updated successfully.");
  } catch (error) {
    HandleError(error);
  }
}
