import { text, spinner, log, isCancel, cancel } from "@clack/prompts";
import { SaveContact } from "../storage/save";
import { LoadData } from "../storage/load";
import { ValidateStringLength } from "../validations/stringLength";
import { ValidateNumericInput } from "../validations/numericInput";

export default async function Add() {
  const name = (await text({
    message: "Enter name:",
    validate: (input) => ValidateStringLength(input, 3, 20),
  })) as string;

  const phone = (await text({
    message: "Enter phone:",
    validate: (input) =>
      ValidateStringLength(input, 4, 12) || ValidateNumericInput(input),
  })) as string;

  SaveContact({ name, phone });

  log.success("Contact saved!");
}
