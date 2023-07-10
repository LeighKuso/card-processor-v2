
export default function CardList({ cards }) {
    return (
        <div className="grid grid-col-3 gap-2">
            {cards.map(card => (
                <div key={card.cardNumber} className="bg-gray-200 p-2">
                    <p>Number: {card.cardNumber}</p>
                    <p>Name: {card.cardName}</p>
                    <p>Exp: {card.cardExpiry}</p>
                </div>
            ))}
        </div>
    )
}