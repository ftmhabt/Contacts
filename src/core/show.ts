import Table from "cli-table3";
import { log, note } from "@clack/prompts";
import { getContacts } from "../services/contactRepository";

export async function Show(): Promise<void> {
  try {
    const contacts = getContacts();

    if (contacts.length === 0) {
      log.message("No contacts to show.", { symbol: "◇" });
      return;
    }

    const table = new Table({
      head: ["#", "Name", "Phone"],
      colWidths: [5, 25, 25],
      style: {
        head: ["green"],
        border: ["grey"],
      },
    });

    contacts.forEach((c, i) => {
      table.push([i + 1, c.name, c.phone]);
    });

    note(table.toString(), "Contact List:");
  } catch (error) {
    log.error("An error occurred in showing contacts.");
  }
}
