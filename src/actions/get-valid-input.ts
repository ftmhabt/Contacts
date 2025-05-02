import { isCancel, text, log } from "@clack/prompts";

export async function getValidInput(
  message: string,
  initialValue?: string,
  validate?: (input: string) => string | undefined
): Promise<string | null> {
  try {
    const input = await text({ message, initialValue, validate });

    if (isCancel(input) || typeof input !== "string") {
      log.error("Unexpected input received.");
      return null;
    }

    return input;
  } catch (error) {
    log.error("Failed to get input.");
    return null;
  }
}
