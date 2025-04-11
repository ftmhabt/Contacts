const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function saveInJson() {
  let name = "";
  while (true) {
    name = await new Promise<string>((resolve) => {
      rl.question("Contact Name: ", (answer) => {
        resolve(answer);
      });
    });

    if (/^[a-zA-Z\s]{2,}$/.test(name)) break;

    console.log("Name must contain only letters and be at least 2 characters.");
  }

  let phone = "";
  while (true) {
    phone = await new Promise<string>((resolve) => {
      rl.question("Contact Phone Number: ", (answer) => {
        resolve(answer);
      });
    });

    if (/^(\+98|0)?9\d{9}$/.test(phone)) break;

    console.log(
      "Phone number must be a valid mobile number (e.g. 09123456789 or +989123456789)."
    );
  }

  const newContact = { name, phone };

  const filePath = "contacts.json";
  let contacts: { name: string; phone: string }[] = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    contacts = JSON.parse(data);
  }

  contacts.push(newContact);
  fs.writeFileSync(filePath, JSON.stringify(contacts));

  console.log("Contact saved!");
  rl.close();
}

saveInJson();
