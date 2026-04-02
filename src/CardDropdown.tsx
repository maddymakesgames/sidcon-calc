import Card, { type FooterGenerator } from './Card.tsx';
import type { CardDef } from './types';

interface Inputs {
    label: string,
    footerGenerator: FooterGenerator,
    cards: CardDef[]
}

function CardDropdown({label, footerGenerator, cards}: Inputs) {

    const collapse_id = `card-dropdown-${label.replace(' ', '-')}`;
    const bs_target = '#' + collapse_id;
    const aria_controls = `collapse-card-dropdown-${label}`;

    const card_elements = cards.flatMap((card) => {
        return card.converters.map((_converter, idx) => {
            return <Card key={card.id} cardID={card.id} card={card} converter_idx={idx} footerGenerator={footerGenerator} />;
        });
    }); 

    console.log(cards);

    return <>
        <div className="row card card-dropdown">
            <div className="card-header d-flex collapsed" data-bs-toggle="collapse" data-bs-target={bs_target} aria-expanded="false" aria-controls={aria_controls}>
                <span className="float-start"><strong>{label}</strong></span>
                <i className="ms-auto align-content-center fa-solid fa-chevron-right"></i>
                <i className="ms-auto align-content-center fa-solid fa-chevron-down"></i>
            </div>
            <div className="card-body collapse" id={collapse_id}>
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1 g-2">
                    {card_elements}
                </div>
            </div>
        </div>
    </>;
}

export default CardDropdown;
