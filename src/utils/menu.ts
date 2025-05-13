import { select } from "@clack/prompts";

export async function GetActionFromUser(): Promise<string> {
  const action = await select({
    message: "What do you want to do?",
    options: [
      { label: "Add Contact", value: "add" },
      { label: "Show Contacts", value: "show" },
      { label: "Edit Contact", value: "edit" },
      { label: "Delete Contact", value: "delete" },
      { label: "Exit", value: "exit" },
    ],
  });

  return action as string;
}
