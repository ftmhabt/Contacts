import { QuestionAsync } from ".";

export async function AskPhone(): Promise<string> {
  return await QuestionAsync("Contact Phone Number: ");
}
