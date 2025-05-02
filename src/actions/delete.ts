import { LoadData } from "../storage/load";
import { confirm, log } from "@clack/prompts";
import { Select } from "./select";
import { SaveAllContacts } from "../storage/save-all";

export default async function Delete() {
  try {
    const index = await Select("Select a contact to delete:");
    if (index === null) return;

    const contacts = LoadData();
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
