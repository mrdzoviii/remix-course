import { LinksFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import styles from "./new-note.css";

export default function NewNote() {
  const navigation = useNavigation();

  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" id="note-form">
      {data?.message ? <p>{data.message}</p> : null}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required data-lpignore />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required data-lpignore />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
