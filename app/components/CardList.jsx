
export default function CardList({ cards }) {
    return (
        <div className="">
            <h1>Stored Cards</h1>
            <ul className="grid">
                {cards.map(card => (
                    <li key={card.id} className="component card">
                        <p>{card.cardNumber}</p>
                        <p>{card.cardName}</p>
                        <p>{card.cardExpry}</p>
                        <p>{card.cardCVC}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}