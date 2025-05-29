import { Add, Delete, Rename } from "../../core/category";
import { CategoryAction } from "../../types/action";

const actionsMap: Record<CategoryAction | "back", () => Promise<void>> = {
  add: Add,
  rename: Rename,
  delete: Delete,
  back: async () => {},
};

export async function HandleAction(action: CategoryAction): Promise<void> {
  await actionsMap[action]();
}
