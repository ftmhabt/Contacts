import { createInterface } from "readline";
import Add from "./actions/add";
import Show from "./actions/show";
import AskMenuItem from "./inputs/menuItem";
import AskReturn from "./inputs/return";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
export async function App() {
  console.log("\n📒 Contact Manager");
  console.log("1. Add Contact");
  console.log("2. Show Contacts");
  console.log("0. Exit\n");

  const answer = await AskMenuItem();

  switch (answer.trim()) {
    case "1":
      await Add();
      App();
      break;
    case "2":
      Show();
      if (await AskReturn()) App();
      break;
    case "0":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      console.log("Invalid option. Try again.");
      App();
      break;
  }
}
