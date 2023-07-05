import fs from 'fs/promises';

export async function getCards() {
    const rawFileContent = await fs.readFile('cards.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedData = data.cards ?? [];
    return storedData;
}

export function saveCards(cards) {
    return fs.writeFile('cards.json', JSON.stringify({ cards: cards || [] }))
}