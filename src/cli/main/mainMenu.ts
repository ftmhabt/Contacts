import { MainAction } from "../../types/action";
import { GetActionFromUser } from "./getUserAction";
import { HandleAction } from "./handleAction";

export async function MainMenu() {
  const action: MainAction = await GetActionFromUser();
  await HandleAction(action);
}
