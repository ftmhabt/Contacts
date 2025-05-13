import { log } from "@clack/prompts";
import { SaveContact } from "../storage/save";
import { Select } from "./select";
import { GetValidInput } from "../utils/getValidInput";
import { ValidateNumericInput, ValidateStringLength } from "../validation";
import { contacts } from "../cli/app";

export async function Edit() {
  const index = await Select("Select a contact to edit:");
  if (index === null) return;

  const newName = await GetValidInput(
    "Enter new name:",
    contacts[index].name,
    (input) => ValidateStringLength(input, 3, 20) || undefined
  );
  if (!newName) {
    log.warn("Edit cancelled.");
    return;
  }

  const newPhone = await GetValidInput(
    "Enter new phone number:",
    contacts[index].phone,
    (input) =>
      ValidateStringLength(input, 4, 12) ||
      ValidateNumericInput(input) ||
      undefined
  );
  if (!newPhone) {
    log.warn("Edit cancelled.");
    return;
  }

  SaveContact({ name: newName, phone: newPhone }, index);

  log.success("Contact updated successfully.");
}
