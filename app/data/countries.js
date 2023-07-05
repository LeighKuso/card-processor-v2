import fs from 'fs/promises';

export async function getCountries() {
    const rawFileContent = await fs.readFile('bannedCountries.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    
    return data.countries ?? [];
}

export function saveCountries(countries) {
    return fs.writeFile('bannedCountries.json', JSON.stringify({countries: countries || []}))
}