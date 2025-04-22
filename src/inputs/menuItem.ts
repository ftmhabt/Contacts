import { QuestionAsync } from ".";

export default async function AskMenuItem(): Promise<string> {
  return await QuestionAsync("Select an option: ");
}
