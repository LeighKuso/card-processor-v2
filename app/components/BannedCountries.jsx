

export default function BannedCountriesList({ countries }) {
    return (
        <div className="flex flex-col">
            <h1>Banned Countries List</h1>
            <ul>
                {countries.map(country => (
                    <li>
                        {country}
                    </li>
                ))}
            </ul>
        </div>
    )
}