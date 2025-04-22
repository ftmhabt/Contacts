import { QuestionAsync } from ".";

export async function AskName(): Promise<string> {
  return await QuestionAsync("Contact Name: ");
}
