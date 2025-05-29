import { isCancel, text } from "@clack/prompts";

export async function promptCategoryName(): Promise<string | null> {
  const name = await text({ message: "Enter new category name:" });
  if (!name || isCancel(name)) return null;

  return name;
}
