import { AskName, AskPhone } from "./components/input";
import { LoadData, SaveContact } from "./components/output";

export async function App() {
  const name = await AskName();
  const phone = await AskPhone();

  const contacts = LoadData();
  contacts.push({ name, phone });

  SaveContact(contacts);
  console.log("Contact saved!");

  await App();
}
