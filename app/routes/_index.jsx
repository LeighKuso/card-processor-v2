import { useLoaderData, Form } from "@remix-run/react";
import { getCards } from "../data/cards";

import CardList from "~/components/CardList";
import { getUserSession } from "~/utils/session.server";
import { redirect } from "@remix-run/node";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const cards = useLoaderData();

  return (
    <main className='h-full px-4 pt-2 flex flex-col'>
      <h1 className='text-2xl mx-auto mb-4'>Welcome to... The Processor</h1>

      <div className='h-100 my-auto p-2 mx-auto w-full'>
        <h1 className="text-2xl my-4">Stored Cards</h1>
        <CardList cards={cards} />
      </div>
    </main>
  );
}

export async function loader({ request }) {
  const cards = await getCards(request);
  return cards;
}
