import { QuestionAsync } from ".";

export default async function AskReturn(): Promise<boolean> {
  const ret = await QuestionAsync("\nTo go back to menu press y: ");
  return ret.trim().toLowerCase() === "y";
}
