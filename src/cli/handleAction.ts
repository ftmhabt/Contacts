import { MainAction } from "../types/action";
import { CategoryMenu } from "./category/menu";
import { ContactMenu } from "./contact/menu";

export async function HandleAction(action: MainAction): Promise<void> {
  if (action === "contacts") {
    await ContactMenu();
  }

  if (action === "categories") {
    await CategoryMenu();
  }

  if (action === "exit") {
    console.log("Goodbye!");
  }
}
