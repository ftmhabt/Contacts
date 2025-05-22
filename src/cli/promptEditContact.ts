import { Contact } from "../types/contact";
import { GetValidInput } from "../utils";
import {
  combineValidators,
  ValidateStringLength,
  ValidateNumericInput,
} from "../validation";
import { SelectContactIndex } from "./select";

export async function promptEditedContact(
  contacts: Contact[]
): Promise<{ index: number; updatedContact: Contact } | null> {
  const index = await SelectContactIndex("Select a contact to edit:", contacts);
  if (index === null) return null;

  const nameValidator = combineValidators((s) =>
    ValidateStringLength(s, 3, 20)
  );

  const phoneValidator = combineValidators(
    (s) => ValidateStringLength(s, 4, 12),
    ValidateNumericInput
  );

  const name = await GetValidInput(
    "Enter new name:",
    contacts[index].name,
    nameValidator
  );
  if (!name) return null;

  const phone = await GetValidInput(
    "Enter new phone:",
    contacts[index].phone,
    phoneValidator
  );
  if (!phone) return null;

  return { index, updatedContact: { name, phone } };
}
