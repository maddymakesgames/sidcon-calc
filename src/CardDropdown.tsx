import Card from './Card.tsx';


function CardDropdown({label, footerGenerator, cards}) {

    const collapse_id = `card-dropdown-${label.replace(' ', '-')}`;
    const bs_target = '#' + collapse_id;
    const aria_controls = `collapse-card-dropdown-${label}`;

    const card_elements = cards.flatMap((card) => {
        return card.converters.map((_converter, idx) => {
            return <Card key={card.id} cardId={card.id} card={card} converter_idx={idx} footerGenerator={footerGenerator} />;
        });
    }); 

    console.log(cards);

    return <>
        <div className="row card card-dropdown">
            <div className="card-header collapsed" data-bs-toggle="collapse" data-bs-target={bs_target} aria-expanded="false" aria-controls={aria_controls}>
                <span className="float-start"><strong>{label}</strong></span>
                <span className="float-end fa-solid fa-chevron-right">🞂</span>
                <span className="float-end fa-solid fa-chevron-down">🞃</span>
            </div>
            <div className="card-body collapse" id={collapse_id}>
                {card_elements}
            </div>
        </div>
    </>;
}

export default CardDropdown;
