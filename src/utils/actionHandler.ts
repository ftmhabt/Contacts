import { Add, Delete, Edit, Show } from "../core";

export async function HandleAction(action: string): Promise<void> {
  switch (action) {
    case "add":
      await Add();
      break;
    case "show":
      await Show();
      break;
    case "edit":
      await Edit();
      break;
    case "delete":
      await Delete();
      break;
    case "exit":
    default:
      console.log("Goodbye!");
      return;
  }
}
