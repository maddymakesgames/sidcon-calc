import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Collapse from 'react-bootstrap/Collapse';
import ConverterCard, { type FooterGenerator } from './ConverterCard.tsx';
import { useState } from 'react';
import type { CardDef } from './types';

interface Inputs {
    label: string,
    footerGenerator: FooterGenerator,
    cards: CardDef[]
}

function CardDropdown({label, footerGenerator, cards}: Inputs) {

    const aria_controls = `collapse-card-dropdown-${label}`;
    const [open, setOpen] = useState(false);

    const card_elements = cards.map((card) => {
        return <ConverterCard key={card.id} card={card} footerGenerator={footerGenerator} />;
    }); 

    console.log(cards);

    return <>
        <Row as={Card} className="card-dropdown">
            <Card.Header className="d-flex collapsed" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={aria_controls}>
                <span className="float-start"><strong>{label}</strong></span>
                <i className={`ms-auto align-content-center fa-solid fa-chevron-${open ? "down" : "right"}`}></i>
            </Card.Header>
            <Card.Body as={Collapse} in={open}>
                <Row lg={3} md={2} sm={1} xs={1} className="g-2">
                    {card_elements}
                </Row>
            </Card.Body>
        </Row>
    </>;
}

export default CardDropdown;
