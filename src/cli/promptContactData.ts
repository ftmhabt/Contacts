import {
  combineValidators,
  ValidateStringLength,
  ValidateNumericInput,
} from "../validation";
import { GetValidInput } from "../utils";
import { Contact } from "../types/contact";

const nameValidator = combineValidators((s) => ValidateStringLength(s, 3, 20));

const phoneValidator = combineValidators(
  (s) => ValidateStringLength(s, 4, 12),
  ValidateNumericInput
);

export async function promptContactData(): Promise<Contact | null> {
  const name = await GetValidInput("Enter name:", "", nameValidator);
  if (!name) return null;

  const phone = await GetValidInput("Enter phone:", "", phoneValidator);
  if (!phone) return null;

  return { name, phone };
}
