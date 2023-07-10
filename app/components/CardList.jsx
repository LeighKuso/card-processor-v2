
export default function CardList({ cards }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono font-bold justify-center">
            {cards.map(card => (
                <div key={card.cardNumber} className="flex justify-between bg-blue-400 p-4 min-h-[150px] h-full min-w-[250px] max-w-[300px] text-black shadow-2xl rounded-xl">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="font-thin">CARD HOLDER </p>
                            {card.cardName}
                        </div>
                        <div >
                            <p className="font-light">CARD NUMBER </p>
                            {card.cardNumber}
                        </div>

                    </div>
                    <div className="self-end">
                        <p className="font-light">EXPIRY </p>
                        {card.cardExpiry}
                    </div>
                </div>
            ))}
        </div>
    )
}