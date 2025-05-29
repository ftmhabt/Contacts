import {
  combineValidators,
  ValidateStringLength,
  ValidateNumericInput,
} from "../../validation";
import { GetValidInput } from "../../utils";
import { Contact } from "../../types/contact";
import { isCancel, multiselect } from "@clack/prompts";
import { getCategoryList } from "../../services/categoryRepository";

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

  const categories = await promptCategories();
  if (!categories) return null;

  return { name, phone, categories };
}

async function promptCategories(): Promise<string[] | null> {
  const allCategories = getCategoryList();
  if (!allCategories) return null;
  if (allCategories.length === 0) return [];

  const selection = await multiselect({
    message:
      "Select categories (optional - space to select, enter to confirm):",
    options: allCategories.map((cat) => ({ label: cat, value: cat })),
    required: false,
  });
  if (isCancel(selection)) return null;
  return selection;
}
