import { LoadData } from "./load";

export default function Show() {
  const contacts = LoadData();

  if (contacts.length === 0) {
    console.log("\n📭 No contacts to show.\n");
    return;
  }

  console.log("\nContact List:\n");
  contacts.forEach((c, i) => {
    const index = String(i + 1);
    const name = c.name.padEnd(20);
    const phone = c.phone;
    console.log(`${index}. ${name} | ${phone}`);
  });
}
