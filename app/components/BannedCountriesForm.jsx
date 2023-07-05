import { useNavigation } from "@remix-run/react";
import countryOptions from "../data/countryOptions";


export default function BannedCountriesForm() {
    const navigation = useNavigation();
    const countriesArray = countryOptions();
    let isSubmitting = navigation.state === 'submitting';

    return (
        <form id="countries-form" method="post" className="mx-auto max-w-prose flex flex-col">
            <select name="SelectCountry" className="form-select" multiple>
                {countriesArray.map((i, country) => (
                    <option
                        key={i}
                        value={country}
                        className=""
                    >
                        {country}
                    </option>
                ))}
            </select>
            <button type="submit" disabled={isSubmitting}
            >
                Save
            </button>
        </form>
    )
}
