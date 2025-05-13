import { Contact } from "../types/contact";
import { LoadData } from "../storage/load";
import {
  GetActionFromUser,
  HandleAction,
  HandleError,
  LogAppHeader,
} from "../utils";

export const contacts: Contact[] = LoadData();

export async function App() {
  try {
    LogAppHeader();

    const action = await GetActionFromUser();
    await HandleAction(action);

    if (action !== "exit") {
      await App();
    }
  } catch (err) {
    HandleError(err);
  }
}
