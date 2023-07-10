import { Form, Link } from "@remix-run/react";

import { signIn } from "~/utils/db.server";
import { createUserSession } from "~/utils/session.server";

export let action = async ({ request }) => {
  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");

  const { user } = await signIn(email, password);
  const token = await user.getIdToken();
  return createUserSession(token, "/");
};

export default function Login() {

  
  return (
    <div className="h-full px-4 pt-2 flex flex-col">
      <h1 className="text-2xl mx-auto mb-4">Login Page</h1>

      <Form method="post" className="h-100 my-auto p-2 mx-auto w-100">
        <p>
          <label>
            Email
            <input
              type="email"
              name="email"
              className="my-2 w-full text-xs rounded"
            />
          </label>
        </p>
        <p>
          <label>
            Password
            <input
              type="text"
              inputMode="password"
              name="password"
              className="my-2 w-full text-xs rounded"
            />
          </label>
        </p>

        <button
          type="submit"
          className="my-2 bg-purple-500 px-2 py-1 rounded"
        >
          Login
        </button>
      </Form>
    </div>
  );
}
