import { outro, select, log } from "@clack/prompts";
import color from "kleur";
import Add from "./actions/add";
import Show from "./actions/show";
import Edit from "./actions/edit";
import Delete from "./actions/delete";

export async function App() {
  log.message("Contact Manager", { symbol: color.yellow("◈") });

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

  switch (action) {
    case "add":
      await Add();
      break;
    case "show":
      Show();
      break;
    case "edit":
      await Edit();
      break;
    case "delete":
      await Delete();
      break;
    case "exit":
    default:
      outro("Goodbye!");
      return;
  }

  await App();
}
