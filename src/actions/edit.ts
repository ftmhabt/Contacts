import { LoadData } from "../storage/load";
import { log } from "@clack/prompts";
import { SaveContact } from "../storage/save";
import { Select } from "./select";
import { getValidInput } from "./get-valid-input";
import { ValidateStringLength } from "../validations/stringLength";
import { ValidateNumericInput } from "../validations/numericInput";

export default async function Edit() {
  const index = await Select("Select a contact to edit:");
  if (index === null) return;

  const contacts = LoadData();

  const newName = await getValidInput(
    "Enter new name:",
    contacts[index].name,
    (input) => ValidateStringLength(input, 3, 20) || undefined
  );
  if (!newName) {
    log.warn("Edit cancelled.");
    return;
  }

  const newPhone = await getValidInput(
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
