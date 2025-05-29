import { select } from "@clack/prompts";
import { CategoryAction, ContactAction } from "../../types/action";

export async function GetActionFromUser(): Promise<CategoryAction> {
  const action = await select({
    message: "Choose contact action:",
    options: [
      { label: "Add", value: "add" },
      { label: "Rename", value: "rename" },
      { label: "Delete", value: "delete" },
      { label: "Back", value: "back" },
    ],
  });

  return action as CategoryAction;
}
