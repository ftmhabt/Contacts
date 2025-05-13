import { log } from "@clack/prompts";
import color from "kleur";

export function LogAppHeader(): void {
  log.message("Contact Manager", { symbol: color.yellow("◈") });
}
