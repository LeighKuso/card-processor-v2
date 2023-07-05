import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewCardForm from "../components/NewCardForm";
import CardList from "../components/CardList";

import { getCards, saveCards } from "../data/cards";
import validateCard from "../utils/cardValidator";

export default function cards() {
    const cards = useLoaderData();

    return (
        <main>
            <div className="flex justify-center">
                <h1 className="heading">Cards</h1>
            </div>
            <NewCardForm />
            <CardList cards={cards} />
        </main>
    )
}

export async function loader() {
    const cards = await getCards();
    return cards;
}

export async function action({ request }) {
    const formData = await request.formData();
    const cardData = Object.fromEntries(formData);
    const storedCards = await getCards();
    // Validation
    // validateCard(cardData); -> all validation 
    const validationErrors = await validateCard(cardData);

    if (!!validationErrors) {
        return json({ errors: validationErrors })
    }
    
    cardData.id = cardData.cardNumber;
    await saveCards(storedCards.concat(cardData));
    return redirect('/cards');
}