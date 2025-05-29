import { select } from "@clack/prompts";
import { ContactAction } from "../../types/action";

export async function GetActionFromUser(): Promise<ContactAction> {
  const action = await select({
    message: "Choose contact action:",
    options: [
      { label: "Add", value: "add" },
      { label: "Show", value: "show" },
      { label: "Edit", value: "edit" },
      { label: "Delete", value: "delete" },
      { label: "Back", value: "back" },
    ],
  });

  return action as ContactAction;
}
