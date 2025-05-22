import { Add, Show, Edit, Delete } from "./";
import { Action } from "../types/action";

const actionsMap: Record<Action, () => Promise<void>> = {
  add: Add,
  show: Show,
  edit: Edit,
  delete: Delete,
  exit: async () => console.log("Goodbye!"),
};

export async function HandleAction(action: Action): Promise<void> {
  await actionsMap[action]();
}
