import { LoadData } from "../storage/load";
import { confirm, log } from "@clack/prompts";
import { Select } from "./select";
import { SaveAllContacts } from "../storage/save-all";

export default async function Delete() {
  const index = await Select("Select a contact to delete:");
  if (index === null) return;

  const contacts = LoadData();
  const confirmDelete = await confirm({
    message: `Delete ${contacts[index].name}?`,
  });

  if (!confirmDelete) {
    log.info("Cancelled.");
    return;
  }

  contacts.splice(index, 1);
  SaveAllContacts(contacts);

  log.success("Contact deleted.");
}
