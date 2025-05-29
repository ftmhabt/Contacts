import { select } from "@clack/prompts";
import { Action } from "../types/action";

export async function GetActionFromUser(): Promise<Action> {
  const action = await select({
    message: "What do you want to do?",
    options: [
      { label: "Add Contact", value: "add" },
      { label: "Show Contacts", value: "show" },
      { label: "Edit Contact", value: "edit" },
      { label: "Delete Contact", value: "delete" },
      { label: "Manage Categories", value: "categories" },
      { label: "Exit", value: "exit" },
    ],
  });

  return action as Action;
}
