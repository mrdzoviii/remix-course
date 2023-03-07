import type {
  ErrorBoundaryComponent,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  CatchBoundaryComponent,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import styles from "~/styles/main.css";
import MainNavigation from "~/components/main-navigation";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Course",
  description: "Remix course by Academind",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
      <title>Error occured</title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>

      <main className="error">
        <h1>{error.name}</h1>
        <p>{error.message}</p>
        <p>
          Back to <Link to="/">safety</Link>
        </p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export const CatchBoundary: CatchBoundaryComponent = () => {
  const response = useCatch();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>Error occured</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>

        <main className="error">
          <h1>{response.statusText}</h1>
          <p>{response.data?.message || "An error occurred"}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
