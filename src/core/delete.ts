import { confirm, log } from "@clack/prompts";
import { SaveAllContacts } from "../storage/saveAll";
import { Select } from "./select";
import { contacts } from "../cli/app";

export async function Delete() {
  try {
    const index = await Select("Select a contact to delete:");
    if (index === null) return;

    if (contacts.length === 0) {
      log.info("No contacts to delete.");
      return;
    }

    const confirmDelete = await confirm({
      message: `Delete ${contacts[index].name}?`,
    });

    if (!confirmDelete) {
      log.info("Deletion cancelled.");
      return;
    }

    contacts.splice(index, 1);
    SaveAllContacts(contacts);
    log.success("Contact deleted successfully.");
  } catch {
    log.error("An error occurred in deletion.");
  }
}
