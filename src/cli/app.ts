import { HandleAction } from "../core/handleAction";
import { Action } from "../types/action";
import { HandleError, LogAppHeader } from "../utils";
import { GetActionFromUser } from "./getUserAction";

export async function App(): Promise<void> {
  try {
    LogAppHeader();
    await runAppLoop();
  } catch (error) {
    HandleError(error);
  }
}

async function runAppLoop() {
  const action: Action = await GetActionFromUser();
  await HandleAction(action);

  runAppLoop();
}
