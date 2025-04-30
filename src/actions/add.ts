import { text, log, isCancel } from "@clack/prompts";
import { SaveContact } from "../storage/save";
import { ValidateStringLength } from "../validations/stringLength";
import { ValidateNumericInput } from "../validations/numericInput";
import { getValidInput } from "./get-valid-input";

export default async function Add() {
  const name = await getValidInput(
    "Enter name:",
    "",
    (input) => ValidateStringLength(input, 3, 20) || undefined
  );
  if (!name) return;

  const phone = await getValidInput(
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
