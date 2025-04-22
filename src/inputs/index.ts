import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function QuestionAsync(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
