import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BannedCountriesForm from "../components/BannedCountriesForm";
import { getCountries, saveCountries } from "../data/countries";
import BannedCountriesList from "../components/BannedCountries";
import { getUserSession } from "~/utils/session.server";

export default function countries() {
    const countries = useLoaderData();

    return (
        <main className="m-2">
            <BannedCountriesForm />
            <BannedCountriesList countries={countries} />
        </main>
    )
}

export async function loader({request}) {
    const session = await getUserSession(request);
    if (!session) {
        return redirect('/login');
    } else {
        const countries = await getCountries();
        return countries;
    }
}

export async function action({ request }) {
    const formData = await request.formData();
    const formJson = Object.fromEntries(formData.entries())
    const formArray = Object.keys(formJson);

    await saveCountries(formArray);
    return redirect('/countries');
}