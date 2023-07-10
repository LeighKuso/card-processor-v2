export default function BannedCountriesList({ countries }) {
    
    return (
        <div className="m-1 mt-4 items-center p-4 max-w-max bg-slate-500 rounded text-white">
            <h1 className="text-2xl my-2">Banned Countries</h1>
            <div className="p-2 grid grid-cols-2 gap-x-3">
                {countries.map((country) => (
                    <span key={country} className="my-1">
                        {country}
                    </span>
                ))}
            </div>
        </div>
    )
}