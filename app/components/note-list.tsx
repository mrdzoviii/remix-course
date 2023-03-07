import { LinksFunction } from "@remix-run/node";
import { Note } from "~/types";
import styles from "./note-list.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes = [] }: NoteListProps) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <article>
            <header>
              <ul className="note-meta">
                <li>#{index + 1}</li>
                <li>
                  <time>
                    {new Date(note.id).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </li>
              </ul>
              <h2>{note.title}</h2>
            </header>
            <p>{note.content}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
