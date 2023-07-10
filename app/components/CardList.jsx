
export default function CardList({ cards }) {
    return (
        <div className="grid grid-cols-2 gap-2">
            {cards.map(card => (
                <div key={card.cardNumber} className=" bg-gray-200 p-3 w-max rounded">
                    <span>Number: {card.cardNumber}</span>
                    <p>Name: {card.cardName}</p>
                    <p>Exp: {card.cardExpiry}</p>
                </div>
            ))}
        </div>
    )
}