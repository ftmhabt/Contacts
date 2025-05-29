import { Add, Show, Edit, Delete } from "./";
import { Action } from "../types/action";
import { ManageCategories } from "./categories";

const actionsMap: Record<Action, () => Promise<void>> = {
  add: Add,
  show: Show,
  edit: Edit,
  delete: Delete,
  categories: ManageCategories,
  exit: async () => console.log("Goodbye!"),
};

export async function HandleAction(action: Action): Promise<void> {
  await actionsMap[action]();
}
