import { redirect } from "@remix-run/node";
import { signOut, getUserSession } from "~/utils/session.server";


export function action({ request }) {
    return signOut(request);
}

export async function loader({request}) {
    const session = await getUserSession(request);
    if (!!session) {
        redirect('/');
    }
    redirect('/login');
}