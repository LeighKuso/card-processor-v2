import { json, redirect } from "@remix-run/node";
import NewCardForm from "../components/NewCardForm";

import { getCards, saveCards } from "../data/cards";
import validateCard from "../utils/cardValidator";
import { getUserSession } from "~/utils/session.server";


export default function cards() {
    return (
        <main className="p-2">
            <div className="mt-2 flex justify-center">
                <h1 className="mb-2 text-xl">Validate Card Form</h1>
            </div>
            <NewCardForm />
        </main>
    )
}

export async function loader({ request }) {
    const session = await getUserSession(request);
    if (!session) {
        return redirect('/login');
    } else {
        return true;
    }
}

export async function action({ request }) {
    const formData = await request.formData();
    const cardData = Object.fromEntries(formData);
    const storedCards = await getCards(request);
    // Validation
    cardData.cardExpiry = `${cardData.cardExpiry_m}/${cardData.cardExpiry_y}`;
    const validationErrors = await validateCard(cardData);

    if (!!validationErrors) {
        return json({ errors: validationErrors })
    }
    if (storedCards.filter(x => x.cardNumber == cardData.cardNumber).length > 0) {
        return json({ errors: { cardNumber: 'This card has already been saved.' } })
    }

    await saveCards(storedCards.concat(cardData));
    return redirect('/');
}