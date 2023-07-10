import { Form, useActionData, useNavigation } from "@remix-run/react";
import countryOptions from "../data/countryOptions";

const errorClassName = `text-red-600 text-2xs w-full`;

export default function NewCardForm() {
    const navigation = useNavigation();
    const actionData = useActionData();
    const countriesArray = countryOptions();
    let isSubmitting = navigation.state === 'submitting';

    const focusSibling = function (target, direction, callback) {
        const nextTarget = target[direction];
        nextTarget && nextTarget.focus();
        // if callback is supplied we return the sibling target which has focus
        callback && callback(nextTarget);
    }
    
    const handleMonthInput = (event) => {
        const value = event.target.value.toString();
        // adds 0 to month user input like 9 -> 09
        if (value.length === 1 && value > 1) {
            event.target.value = "0" + value;
        }
        // bounds
        if (value === "00") {
            event.target.value = "01";
        } else if (value > 12) {
            event.target.value = "12";
        }
        // if we have a filled input we jump to the year input
        2 <= event.target.value.length && focusSibling(event.target, "nextElementSibling");
        //event.stopImmediatePropagation();
        return true;
    }

    const handleYearKeyDown = (event) => {
        if (event.key === "Backspace" && event.target.selectionStart === 0) {
            focusSibling(event.target, "previousElementSibling");
            event.stopImmediatePropagation();
        }
        if (!/[0-9]/.test(event.key) && event.key != 'Backspace') {
            event.preventDefault()
        }
        return true;
    }

    return (
        <Form id="card-form" method="post" className="p-4 mx-auto w-80 grid grid-cols-2 gap-3 bg-gray-200 rounded-md text-black">
            <label className="col-span-2 text-sm">
                <span className="mb-1">
                    Name on card: {actionData?.errors?.cardName ? (
                        <span className={errorClassName}>{actionData.errors.cardName}</span>
                    ) : null}
                </span>
                <input
                    type="text"
                    name="cardName"
                    autoComplete="off"
                    className="w-full text-xs rounded"
                    required
                    maxLength={50}
                />
            </label>
            <label className="col-span-2 text-sm rounded">
                <p className="mb-1">
                    Card Number: {actionData?.errors?.cardNumber ? (
                        <span className={errorClassName}>{actionData.errors.cardNumber}</span>
                    ) : null}
                </p>
                <input
                    type="text"
                    name="cardNumber"
                    autoComplete="off"
                    className="w-full text-xs rounded"
                    onKeyDown={(e) => { if (!/[0-9]/.test(e.key) && e.key != 'Backspace') return e.preventDefault() }}
                    maxLength="16"
                />
            </label>
            <label className="grid grid-cols-2 col-span-1 text-sm">
                <p className="col-span-2 mb-1">
                    Expiry Date:{actionData?.errors?.cardExpiry ? (
                        <span className={errorClassName + ' col-span-2'}>{actionData.errors.cardExpiry}</span>
                    ) : null}
                </p>
                <input
                    className="text-xs rounded mx-1 text-center"
                    type="text"
                    name="cardExpiry_m"
                    autoComplete="off"
                    placeholder="MM"
                    onInput={handleMonthInput}
                    onKeyDown={(e) => { if (!/[0-9]/.test(e.key) && e.key != 'Backspace') return e.preventDefault() }}
                    maxLength="2"
                />
                <input
                    type="text"
                    placeholder="YY"
                    name="cardExpiry_y"
                    autoComplete="off"
                    className="text-xs rounded mx-1 text-center"
                    onKeyDown={handleYearKeyDown}
                    maxLength="2"
                />
            </label>
            <label className="col-span-1 text-sm">
                <span className="mb-1">CVC: {actionData?.errors?.cardName ? (
                    <span className={errorClassName}>{actionData.errors.cardCVC}</span>
                ) : null}</span>
                <input
                    className="w-full text-xs rounded"
                    type="text"
                    name="cardCVC"
                    autoComplete="off"
                    required
                    onKeyDown={(e) => { if (!/[0-9]/.test(e.key) && e.key != 'Backspace') return e.preventDefault() }}
                    maxLength={3}
                />
            </label>
            <label className="col-span-2 text-sm w-7/12 m-auto">
                <span className="mb-1">
                    Country: {actionData?.errors?.country ? (
                        <span className={errorClassName}>{actionData.errors.country}</span>
                    ) : null}
                </span>
                <select
                    name="country"
                    className=" rounded w-full"
                >
                    {countriesArray.map((country, i) => (
                        <option
                            key={i}
                            value={country}
                            className="w-full"
                        >
                            {country}
                        </option>
                    ))}
                </select>
            </label>
            <div className="col-span-2 flex justify-end p-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded bg-purple-500 py-2 px-4 text-white hover:bg-purple-600 focus:bg-purple-400 disabled:bg-purple-300"
                >
                    Save Card
                </button>
            </div>
        </Form>
    );
}
