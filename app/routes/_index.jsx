import { useLoaderData } from "@remix-run/react";
import { getCards } from "../data/cards";

import CardList from "~/components/CardList";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const cards = useLoaderData();

  return (
    <main className='px-4 pt-2 flex flex-col'>
      <h1 className='mx-auto mb-4'>Welcome to... The Processor</h1>

      <div className='h-full mt-2 p-2 mx-auto'>
        <h1 className="text-2xl my-2">Stored Cards</h1>
        <CardList cards={cards} />
      </div>
    </main>
  );
}

export async function loader() {
  const cards = await getCards();
  return cards;
}
