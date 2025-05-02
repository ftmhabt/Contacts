import { LoadData } from "../storage/load";
import { log, select, isCancel } from "@clack/prompts";

export async function Select(promptMsg = "Select a contact:") {
  try {
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

    return typeof selected === "number" ? selected : null;
  } catch (error) {
    log.error("Failed to display selection prompt.");
    return null;
  }
}
