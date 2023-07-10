import stylesheet from "~/tailwind.css";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Layout from "./components/Layout";
import { getUserSession } from "./utils/session.server";

export const links = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-700 text-white">
        <Layout session={data?.session}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export async function loader({ request }) {
  const session = await getUserSession(request);
  if (!session) {
    return json({session:false});
  } else {
    return json({session:true});
  }
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Layout>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </Layout>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <Layout>
      <div className="bg-slate-700 text-white">
        <h1>Oops! There was an error</h1>
        <p>{error?.message || error?.code}</p>
        <hr />
        <p>
          You were not supposed to see this.
        </p>
        <div>
          <img src="https://media.giphy.com/media/GDnomdqpSHlIs/giphy.gif" alt="Oppsies" />
        </div>
      </div>
    </Layout>
  );
}