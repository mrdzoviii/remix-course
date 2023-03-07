import { Note } from "~/types";
import fs from "fs/promises";

export async function getStoredNotes(): Promise<Note[]> {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedNotes: Note[] = data.notes ?? [];
  return storedNotes;
}

export async function storeNotes(notes: Note[]) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}
