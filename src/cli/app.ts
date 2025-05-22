import { HandleAction } from "../core/handleAction";
import { initContacts } from "../services/contactRepository";
import { Action } from "../types/action";
import { HandleError, LogAppHeader } from "../utils";
import { GetActionFromUser } from "./getUserAction";

export async function App(): Promise<void> {
  try {
    initContacts();
    LogAppHeader();
    await runAppLoop();
  } catch (error) {
    HandleError(error);
  }
}

async function runAppLoop(): Promise<void> {
  let exit = false;
  while (!exit) {
    const action: Action = await GetActionFromUser();
    await HandleAction(action);
    if (action === "exit") exit = true;
  }
}
