import { Contact } from "../types";
import { LoadData } from "./load";
import { SaveAllContacts } from "./save-all";

export function SaveContact(contact: Contact, index: number = -1) {
  const contacts = LoadData();
  if (index < 0) contacts.push(contact);
  else contacts[index] = contact;

  SaveAllContacts(contacts);
}
