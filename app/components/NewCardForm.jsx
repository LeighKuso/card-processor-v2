import { Form, useActionData, useNavigation } from "@remix-run/react";
import countryOptions from "../data/countryOptions";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;
const errorClassName = `text-red-600 text-xs`;

export default function NewCardForm() {
    const navigation = useNavigation();
    const actionData = useActionData();
    const countriesArray = countryOptions();
    let isSubmitting = navigation.state === 'submitting';


    return (
        <Form id="card-form" method="post" className="p-2 mx-auto w-3/5 grid grid-cols-4 gap-3">
            <p className="col-span-4 text-sm">
                <label>
                    Name on card{" "}
                    <input
                        type="text"
                        name="cardName"
                        className={inputClassName}
                        required
                        maxLength={25}
                        minLength={5}
                    />
                    {actionData?.errors?.cardName ? (
                        <span className={errorClassName}>{actionData.errors.cardName}</span>
                    ) : null}
                </label>
            </p>
            <p className="col-span-4 text-sm">
                <label>
                    Card Number{" "}
                    <input
                        type="text"
                        name="cardNumber"
                        className={inputClassName}
                        required
                        maxLength={16}
                        minLength={14}
                    />
                </label>
                {actionData?.errors?.cardNumber ? (
                    <span className={errorClassName}>{actionData.errors.cardNumber}</span>
                ) : null}
            </p>
            <p className="col-span-2 text-sm">
                <label>
                    Expiry Date:{" "}
                    <input
                        type="text"
                        name="cardExpiry"
                        className={inputClassName}
                        required
                        maxLength={4}
                        minLength={4}
                    />
                    {actionData?.errors?.cardExpiry ? (
                        <span className={errorClassName}>{actionData.errors.cardExpiry}</span>
                    ) : null}
                </label>
            </p>
            <p className="col-span-2 text-sm">
                <label>
                    CVC:{" "}
                    <input
                        type="text"
                        name="cardCVC"
                        className={inputClassName}
                        required
                        maxLength={3}
                    />
                    {actionData?.errors?.cardName ? (
                    <span className={errorClassName}>{actionData.errors.cardName}</span>
                ) : null}
                </label>
            </p>
            <p className="col-span-4 text-sm flex justify-center">
                <label className="w-3/5">
                    Country:{" "}
                    <select name="country" className={inputClassName}>
                        {countriesArray.map((country, i) => (
                            <option
                                key={i}
                                value={country}
                                className=""
                            >
                                {country}
                            </option>
                        ))}
                    </select>
                    {actionData?.errors?.country ? (
                    <span className={errorClassName}>{actionData.errors.country}</span>
                ) : null}
                </label>
            </p>
            <p className="col-span-4 relative">
                <button
                    type="submit"
                    disabled={isSubmitting || !!actionData?.errors}
                    className="m-2 right-0 absolute rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                >
                    Save Card
                </button>
            </p>
        </Form>
    );
}
