import { LoadData } from "../storage/load";
import { select, text, log } from "@clack/prompts";
import { SaveContact } from "../storage/save";
import { Select } from "./select";

export default async function Edit() {
  const index = await Select("Select a contact to edit:");
  if (index === null) return;

  const contacts = LoadData();

  const newName = (await text({
    message: "Enter new name:",
    initialValue: contacts[index].name,
  })) as string;

  const newPhone = (await text({
    message: "Enter new phone number:",
    initialValue: contacts[index].phone,
  })) as string;

  if (!newName || !newPhone) {
    log.warn("Edit cancelled.");
    return;
  }

  SaveContact({ name: newName, phone: newPhone }, index);

  log.success("Contact updated successfully.");
}
