import { redirect } from "@remix-run/node";
import fs from 'fs/promises';

import { getUserSession } from "~/utils/session.server";

export async function getCards(request) {
    const sessionUser = await getUserSession(request);
    if (!sessionUser) {
        return redirect("/login");
    }
    const rawFileContent = await fs.readFile('cards.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedData = data.cards ?? [];
    return storedData;
}

export async function saveCards(cards) {
    const sessionUser = await getUserSession(request);
    if (!sessionUser) {
        return redirect("/login");
    }
    return fs.writeFile('cards.json', JSON.stringify({ cards: cards || [] }))
}