import { confirm, isCancel, log, select } from "@clack/prompts";
import { getCategoryList } from "../../services/categoryRepository";
import { deleteCategory } from "../../services/categoryService";
import { HandleError } from "../../utils";
import { getContacts } from "../../services/contactRepository";

export async function Delete(): Promise<void> {
  try {
    const categories = getCategoryList();

    if (!categories) return;
    if (categories.length === 0) {
      log.message("No categories available to delete.");
      return;
    }

    const name = (await select({
      message: "Select a category to delete:",
      options: categories.map((c) => ({ label: c, value: c })),
    })) as string;

    if (name === null) {
      log.info("Deletion cancelled.");
      return;
    }

    const confirmed = await confirm({
      message: `Are you sure?`,
    });

    if (!confirmed) {
      log.info("Deletion cancelled.");
      return;
    }

    deleteCategory(name);
    log.success(`Category successfully deleted`);
  } catch (error) {
    HandleError(error);
  }
}
