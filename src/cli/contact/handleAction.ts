import { ContactAction } from "../../types/action";
import { Add, Delete, Edit, Show } from "../../core/contact";

const actionsMap: Record<ContactAction | "back", () => Promise<void>> = {
  add: Add,
  show: Show,
  edit: Edit,
  delete: Delete,
  back: async () => {},
};

export async function HandleAction(action: ContactAction): Promise<void> {
  await actionsMap[action]();
}
