import { accessSync, constants } from "fs";

export function CheckAccess(path: string): boolean {
  try {
    accessSync(path, constants.F_OK | constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
}
