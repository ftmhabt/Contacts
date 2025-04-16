const fs = require("fs");

const FILE_PATH = "./data/contacts.json";

export function LoadData() {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.error("file corrupted");
      console.log("new file created");
    }
  }
  return [];
}

export function SaveContact(contacts: { name: string; phone: string }[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(contacts, null, 2));
}
