import { writeFileSync } from "fs";
import { FILE_PATH } from "../config";
import { EnsureDirectoryExists } from "./exist";
import { LoadData } from "./load";

export function SaveContact(
  contact: { name: string; phone: string },
  index: number = -1
) {
  EnsureDirectoryExists(FILE_PATH);
  const prevData = LoadData();

  if (index < 0) prevData.push(contact);
  else prevData[index] = contact;

  writeFileSync(FILE_PATH, JSON.stringify(prevData, null, 2));
}
