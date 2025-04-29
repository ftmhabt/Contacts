import { LoadData } from "../storage/load";
import { writeFileSync } from "fs";
import { FILE_PATH } from "../config";
import { confirm, log } from "@clack/prompts";
import { EnsureDirectoryExists } from "../storage/exist";
import { Select } from "./select";

export default async function Delete() {
  const index = await Select("Select a contact to delete:");
  if (index === null) return;

  const contacts = LoadData();
  const confirmDelete = await confirm({
    message: `Delete ${contacts[index].name}?`,
  });

  if (!confirmDelete) {
    log.info("Cancelled.");
    return;
  }

  contacts.splice(index, 1);
  EnsureDirectoryExists(FILE_PATH);
  writeFileSync(FILE_PATH, JSON.stringify(contacts, null, 2));

  log.success("Contact deleted.");
}
