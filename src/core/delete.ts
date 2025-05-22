import { SelectContactIndex } from "../cli/select";
import { getContacts } from "../services/contactRepository";
import { deleteContact } from "../services/contactService";
import { confirm, log } from "@clack/prompts";
import { HandleError } from "../utils";

export async function Delete(): Promise<void> {
  try {
    const contacts = getContacts();

    if (contacts.length === 0) {
      log.info("No contacts to delete.");
      return;
    }

    const index = await SelectContactIndex(
      "Select a contact to delete:",
      contacts
    );
    if (index === null) {
      log.info("Deletion cancelled.");
      return;
    }

    const confirmed = await confirm({
      message: `Delete ${contacts[index].name}?`,
    });

    if (!confirmed) {
      log.info("Deletion cancelled.");
      return;
    }

    deleteContact(index);
    log.success("Contact deleted successfully.");
  } catch (error) {
    HandleError(error);
  }
}
