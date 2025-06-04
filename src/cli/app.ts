import { MainAction } from "../types/action";
import { HandleError, LogAppHeader } from "../utils";
import { GetActionFromUser } from "./main/getUserAction";
import { HandleAction } from "./main/handleAction";

export async function App(): Promise<void> {
  try {
    LogAppHeader();
    runAppLoop();
  } catch (error) {
    HandleError(error);
  }
}

async function runAppLoop() {
  const action: MainAction = await GetActionFromUser();
  await HandleAction(action);

  runAppLoop();
}
