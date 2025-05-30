import { log } from "@clack/prompts";
import { HandleError } from "../../utils";
import { promptCategoryName } from "../../cli/category/promptCategoryName";
import { addCategory } from "../../services/categoryService";

export async function Add(): Promise<void> {
  try {
    const category = await promptCategoryName();
    if (!category) return;

    await addCategory(category);
    log.success("Category added!");
  } catch (error) {
    HandleError(error);
  }
}
