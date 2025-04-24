import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export function EnsureDirectoryExists(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}
