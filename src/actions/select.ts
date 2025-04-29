import { LoadData } from "../storage/load";
import { log, select } from "@clack/prompts";

export async function Select(promptMsg = "Select a contact:") {
  const contacts = LoadData();

  if (contacts.length === 0) {
    log.message("No contacts to show.", { symbol: "◇" });
    return null;
  }

  const selected = await select({
    message: promptMsg,
    options: contacts.map((c, i) => ({
      label: `${c.name} (${c.phone})`,
      value: i,
    })),
  });

  return selected === undefined ? null : Number(selected);
}
