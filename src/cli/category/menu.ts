import { CategoryAction } from "../../types/action";
import { GetActionFromUser } from "./getUserAction";
import { HandleAction } from "./handleAction";

export async function CategoryMenu() {
  const action: CategoryAction = await GetActionFromUser();
  await HandleAction(action);
}
