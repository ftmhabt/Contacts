import { log } from "@clack/prompts";

export function HandleError(err: unknown): void {
  log.error(typeof err === "string" ? err : (err as Error).message);
}
