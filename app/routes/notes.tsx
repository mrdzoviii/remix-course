import {
  ActionArgs,
  ActionFunction,
  json,
  LinksFunction,
  LoaderArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/new-note";
import NoteList, { links as noteListLinks } from "~/components/note-list";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { Note } from "~/types";

export default function NotesPage() {
  const notes = useLoaderData() as Note[];
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader(args: LoaderArgs) {
  const notes = await getStoredNotes();
  return notes;
}

export async function action({ request }: ActionArgs) {
  const data = await request.formData();
  const noteData: Note = {
    id: Infinity,
    title: data.get("title")?.toString() || "",
    content: data.get("content")?.toString() || "",
  };

  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = Date.now();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);
  await new Promise((res, rej) =>
    setTimeout(() => {
      res(true);
    }, 2000)
  );

  return redirect("/notes");
}

export const links: LinksFunction = () => {
  return [...newNoteLinks(), ...noteListLinks()];
};
