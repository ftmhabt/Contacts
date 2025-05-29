import { isCancel, select, text } from "@clack/prompts";

export async function promptRenamedCategory(categories: string[]) {
  const oldName = await select({
    message: "Select a category to rename:",
    options: categories.map((c) => ({ label: c, value: c })),
  });

  if (isCancel(oldName)) return;

  const newName = await text({
    message: `Enter new name for "${oldName}":`,
  });

  if (isCancel(newName)) return;

  return { oldName, newName };
}
