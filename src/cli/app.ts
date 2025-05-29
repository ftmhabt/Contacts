import { MainAction } from "../types/action";
import { HandleError, LogAppHeader } from "../utils";
import { GetActionFromUser } from "./getUserAction";
import { HandleAction } from "./handleAction";

export async function App(): Promise<void> {
  try {
    LogAppHeader();
    await runAppLoop();
  } catch (error) {
    HandleError(error);
  }
}

async function runAppLoop() {
  const action: MainAction = await GetActionFromUser();
  await HandleAction(action);

  runAppLoop();
}
