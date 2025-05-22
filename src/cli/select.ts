import { select } from "@clack/prompts";
import { Contact } from "../types/contact";

export async function SelectContactIndex(
  message: string,
  contacts: Contact[]
): Promise<number | null> {
  if (contacts.length === 0) return null;

  const options = contacts.map((c, i) => ({
    label: `${c.name} - ${c.phone}`,
    value: i,
  }));

  const result = await select({
    message,
    options,
  });

  return typeof result === "number" ? result : null;
}
