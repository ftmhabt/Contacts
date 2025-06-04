import { select } from "@clack/prompts";
import { MainAction } from "../../types/action";

export async function GetActionFromUser(): Promise<MainAction> {
  const action = await select({
    message: "What would you like to manage?",
    options: [
      { label: "Contacts", value: "contacts" },
      { label: "Categories", value: "categories" },
      { label: "Exit", value: "exit" },
    ],
  });

  return action as MainAction;
}
