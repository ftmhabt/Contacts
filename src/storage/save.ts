import { contacts } from "../cli/app";
import { Contact } from "../types/contact";
import { SaveAllContacts } from "./saveAll";

export function SaveContact(contact: Contact, index: number = -1) {
  if (index < 0) contacts.push(contact);
  else contacts[index] = contact;

  SaveAllContacts(contacts);
}
