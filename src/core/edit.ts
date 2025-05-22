import { log } from "@clack/prompts";
import { promptEditedContact } from "../cli/promptEditContact";
import { getContacts } from "../services/contactRepository";
import { editContact } from "../services/contactService";
import { HandleError } from "../utils";

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
