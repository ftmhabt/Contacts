import { isCancel, text } from "@clack/prompts";

export async function getValidInput(
  message: string,
  initialValue?: string,
  validate?: (input: string) => string | Error | undefined
) {
  const input = await text({ message, initialValue, validate });
  if (isCancel(input)) return null;
  return input;
}
