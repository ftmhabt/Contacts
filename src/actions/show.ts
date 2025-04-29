import { LoadData } from "../storage/load";
import { log, note } from "@clack/prompts";
import Table from "cli-table3";

export default function Show() {
  const contacts = LoadData();

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
}
