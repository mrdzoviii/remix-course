import {
  ActionArgs,
  ActionFunction,
  ErrorBoundaryComponent,
  json,
  LinksFunction,
  LoaderArgs,
  redirect,
} from "@remix-run/node";
import {
  CatchBoundaryComponent,
  Link,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
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

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes" },
      { status: 404, statusText: "Not Found" }
    );
  }
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

export const CatchBoundary: CatchBoundaryComponent = () => {
  const error = useCatch();

  const message = error.data?.message || "Data not found";
  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <main className="error">
    <h1>{error.name}</h1>
    <p>{error.message}</p>
    <p>
      Back to <Link to="/">safety</Link>
    </p>
  </main>
);

export const links: LinksFunction = () => {
  return [...newNoteLinks(), ...noteListLinks()];
};
