import { getContacts, saveContacts } from "./contactRepository";
import { Contact } from "../types/contact";

export function addContact(contact: Contact): void {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
}

export function editContact(index: number, updatedContact: Contact): void {
  const contacts = getContacts();
  contacts[index] = updatedContact;
  saveContacts(contacts);
}

export function deleteContact(index: number): void {
  const contacts = getContacts();
  contacts.splice(index, 1);
  saveContacts(contacts);
}
