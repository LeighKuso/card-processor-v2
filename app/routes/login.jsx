import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { signIn } from "~/utils/db.server";
import { createUserSession } from "~/utils/session.server";

export default function LoginForm() {
  const actionData = useActionData();
  console.log("LOGIN FORM");
  console.log(actionData?.error);

  return (
    <div className="h-full px-4 pt-2 flex flex-col">
      <h1 className="text-2xl mx-auto mb-4">Login Page</h1>

      <Form method="post" className="h-100 m-auto p-2 w-80">
        <label>
          Email
          <input
            type="email"
            name="email"
            className="my-2 w-full text-xs rounded text-black"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            className="my-2 w-full text-xs rounded text-black"
          />
        </label>

        <button
          type="submit"
          className="my-3 bg-purple-500 px-4 py-2 rounded"
        >
          LOGIN
        </button>
      </Form>
      {actionData?.error ?
        <p className="text-red-600 text-2xs w-full">
          ERROR: {actionData.error.code}
        </p>
        : null}
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const { user, error } = await signIn(email, password);

  if (error) {
    return json({ error });
  }
  if (user) {
    const token = await user.getIdToken();
    return createUserSession(token, "/");
  }
  return json({ error: "Unexpected Error" });
};