import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BannedCountriesForm from "../components/BannedCountriesForm";
import { getCountries, saveCountries } from "../data/countries";
import BannedCountriesList from "../components/BannedCountries";

export default function countries() {
    const countries = useLoaderData();

    return (
        <main>
            <div className="flex justify-center">
                <h1 className="heading">Cards</h1>
            </div>
            <BannedCountriesForm />
            <BannedCountriesList countries={countries} />
        </main>
    )
}

export async function loader() {
    const cards = await getCards();
    return cards;
}

export async function action({ request }) {
    const formData = await request.formData();
    const bannedCountries = [...formData];
    // clean out <select> name values

    await saveCountries(bannedCountries);
    return redirect('/cards');
}