import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import validator from "validator";

import countryOptions from "../data/countryOptions";

export default function BannedCountriesForm() {
    const navigation = useNavigation();
    const countriesArray = countryOptions();
    const savedCountries = useLoaderData();
    let isSubmitting = navigation.state === 'submitting';

    return (
        <div className="m-1 flex flex-col items-center bg-gray-200 rounded p-2 relative">
            <h1 className="text-2xl my-2">Banned Countries Form</h1>
            <Form id="countries-form" method="post" action="/countries" className="my-4 mx-auto max-w-prose grid gap-4 grid-cols-3">
                {countriesArray.map((country, i) => (
                    <label className="w-auto" key={i}>
                        <input
                            type="checkbox"
                            name={country}
                            defaultChecked={validator.isIn(country, savedCountries)}
                            className=""
                        />
                        <span className="mx-2">{country}</span>
                    </label>
                ))}

            <button
                type="submit"
                disabled={isSubmitting}
                className="col-span-3 mx-auto w-3/5 m-2 bg-purple-600 text-white rounded px-4 py-1 hover:bg-purple-800"
            >
                Save
            </button>
            </Form>
        </div>
    )
}
