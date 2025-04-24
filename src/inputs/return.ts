import { QuestionAsync } from ".";

export default async function AskReturn(): Promise<boolean> {
  const ret = await QuestionAsync("\nTo go back to menu press 0: ");
  return ret.trim() === "0";
}
