import { Contact } from "../../types/contact";
import { GetValidInput } from "../../utils";
import {
  combineValidators,
  ValidateStringLength,
  ValidateNumericInput,
} from "../../validation";
import { isCancel, multiselect } from "@clack/prompts";
import { getCategoryList } from "../../services/categoryRepository";
import { SelectContactIndex } from "../select";

const nameValidator = combineValidators((s) => ValidateStringLength(s, 3, 20));
const phoneValidator = combineValidators(
  (s) => ValidateStringLength(s, 4, 12),
  ValidateNumericInput
);

async function promptCategories(
  initial: string[] = []
): Promise<string[] | null> {
  const allCategories = getCategoryList();
  if (!allCategories) return null;
  if (allCategories.length === 0) return [];

  const categories = await multiselect({
    message: "Select categories for this contact (optional):",
    options: allCategories.map((cat) => ({
      label: cat,
      value: cat,
    })),
    initialValues: initial,
    required: false,
  });

  if (isCancel(categories)) return null;
  return categories;
}

export async function promptEditedContact(contacts: Contact[]) {
  const index = await SelectContactIndex("Select a contact to edit:", contacts);
  if (index === null) return null;

  const current = contacts[index];

  const name = await GetValidInput(
    "Enter new name:",
    current.name,
    nameValidator
  );
  if (!name) return null;

  const phone = await GetValidInput(
    "Enter new phone:",
    current.phone,
    phoneValidator
  );
  if (!phone) return null;

  const categories = await promptCategories(current.categories);
  if (categories === null) return null;

  return {
    index,
    updatedContact: { name, phone, categories },
  };
}
