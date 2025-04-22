import { SaveContact } from "./save";
import { AskName } from "../inputs/name";
import { AskPhone } from "../inputs/phone";
import { LoadData } from "./load";
import { ValidateStringLength } from "../validations/stringLength";
import { GetValidInput } from "../inputs/get";

export default async function Add() {
  const name = await GetValidInput(AskName, (input) =>
    ValidateStringLength(input, 3, 20)
  );
  const phone = await GetValidInput(AskPhone, (input) =>
    ValidateStringLength(input, 4, 12)
  );

  const contacts = LoadData();
  contacts.push({ name, phone });

  SaveContact(contacts);
  console.log("Contact saved!");
}
