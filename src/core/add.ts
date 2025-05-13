import { log } from "@clack/prompts";
import { SaveContact } from "../storage/save";
import { ValidateNumericInput, ValidateStringLength } from "../validation";
import { GetValidInput } from "../utils";

export async function Add() {
  const name = await GetValidInput(
    "Enter name:",
    "",
    (input) => ValidateStringLength(input, 3, 20) || undefined
  );
  if (!name) return;

  const phone = await GetValidInput(
    "Enter phone:",
    "",
    (input) =>
      ValidateStringLength(input, 4, 12) ||
      ValidateNumericInput(input) ||
      undefined
  );
  if (!phone) return;

  SaveContact({ name, phone });
  log.success("Contact saved!");
}
