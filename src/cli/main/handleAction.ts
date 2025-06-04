import { exit } from "process";
import { MainAction } from "../../types/action";
import { ContactMenu } from "../contact/menu";
import { CategoryMenu } from "../category/menu";

export async function HandleAction(action: MainAction): Promise<void> {
  if (action === "contacts") {
    await ContactMenu();
  }

  if (action === "categories") {
    await CategoryMenu();
  }

  if (action === "exit") {
    console.log("Goodbye!");
    exit();
  }
}
