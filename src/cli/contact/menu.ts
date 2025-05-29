import { ContactAction } from "../../types/action";
import { GetActionFromUser } from "./getUserAction";
import { HandleAction } from "./handleAction";

export async function ContactMenu() {
  const action: ContactAction = await GetActionFromUser();
  await HandleAction(action);
}
