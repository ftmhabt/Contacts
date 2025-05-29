import { EnsureFileReady, HandleError } from "../utils";
import { SafeWriteFile } from "../utils/safeWrite";
import { CATEGORIES_FILE_PATH } from "../config/paths";
import { readFileSync } from "fs";
import { INITIAL_CATEGORIES } from "../config/constants";
import { getContacts } from "./contactRepository";
import { log } from "@clack/prompts";

let categories: string[] = [];

export function initCategories(): void {
  categories = loadCategoryData();
}

export function loadCategoryData(): string[] {
  try {
    return readCategoryFile();
  } catch (err) {
    HandleError(err);
    const fallback = generateFallbackCategories();
    SafeWriteFile(CATEGORIES_FILE_PATH, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

function readCategoryFile() {
  EnsureFileReady(CATEGORIES_FILE_PATH);
  const raw = readFileSync(CATEGORIES_FILE_PATH, "utf-8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data)) throw new Error("Invalid JSON format");
  if (data.length === 0) throw new Error("Empty category file");
  return data;
}

function generateFallbackCategories(): string[] {
  const used = getUsedCategories();
  return Array.from(new Set([...INITIAL_CATEGORIES, ...used]));
}

function getUsedCategories(): string[] {
  const contacts = getContacts();
  return Array.from(
    new Set(contacts.flatMap((contact) => contact.categories || []))
  );
}

export function getCategoryList(): string[] | null {
  if (categories.length === 0) {
    log.message("No categories available.");
    return null;
  }

  return categories;
}

export function setCategoryList(updated: string[]): void {
  categories = updated;
}

export function saveCategoryList(updated: string[]): void {
  setCategoryList(updated);
  EnsureFileReady(CATEGORIES_FILE_PATH);
  SafeWriteFile(CATEGORIES_FILE_PATH, JSON.stringify(updated, null, 2));
}
