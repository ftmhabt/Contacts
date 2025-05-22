import { log } from "@clack/prompts";
import { promptContactData } from "../cli/promptContactData";
import { addContact } from "../services/contactService";
import { HandleError } from "../utils";

export async function Add(): Promise<void> {
  try {
    const contact = await promptContactData();
    if (!contact) return;

    addContact(contact);
    log.success("Contact saved!");
  } catch (error) {
    HandleError(error);
  }
}
