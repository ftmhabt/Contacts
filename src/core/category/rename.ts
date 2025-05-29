import { log } from "@clack/prompts";
import { getCategoryList } from "../../services/categoryRepository";
import { promptRenamedCategory } from "../../cli/category/promptRenamedCategory";
import { renameCategory } from "../../services/categoryService";
import { HandleError } from "../../utils";

export async function Rename(): Promise<void> {
  try {
    const categories = getCategoryList();
    if (!categories) return;

    const result = await promptRenamedCategory(categories);
    if (!result) {
      log.warn("Edit cancelled.");
      return;
    }

    const { oldName, newName } = result;
    renameCategory(oldName, newName);
    log.success("Category renamed successfully.");
  } catch (error) {
    HandleError(error);
  }
}
