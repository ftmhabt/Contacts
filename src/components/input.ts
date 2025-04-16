import { ValidateStringLength } from "./validation";
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function QuestionAsync(query: string) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

export async function AskName() {
  while (true) {
    const name = (await QuestionAsync("Contact Name: ")) as string;
    if (ValidateStringLength(name, 3, 20)) return name;
  }
}

export async function AskPhone() {
  while (true) {
    const phone = (await QuestionAsync("Contact Phone Number: ")) as string;
    if (ValidateStringLength(phone, 4, 12)) return phone;
  }
}
