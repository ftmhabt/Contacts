import { isCancel, text, log } from "@clack/prompts";

export async function GetValidInput(
  message: string,
  initialValue?: string,
  validate?: (input: string) => string | undefined
): Promise<string | null> {
  try {
    const input = await text({ message, initialValue, validate });

    if (isCancel(input) || typeof input !== "string") {
      log.error("Input was cancelled or invalid.");
      return null;
    }

    return input;
  } catch {
    log.error("Failed to get input.");
    return null;
  }
}
