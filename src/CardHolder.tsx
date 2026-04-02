import type { FooterGenerator } from './Card.tsx';
import CardDropdown from './CardDropdown.tsx';
import type { CardDef } from './types';

interface CardHolderInputs {
    currFaction: string,
    ownedCards: CardDef[],
    footerGenerator: FooterGenerator
}

function CardHolder({currFaction, ownedCards, footerGenerator}: CardHolderInputs) {
    const cardEras: CardDef[][] = [[], [], [], [], []];
    for(const card of ownedCards) {
        if(card.owner != currFaction) {
            cardEras[4].push(card);
        } else {
            cardEras[card.era].push(card);
        }
    }

    return <>
        <div className="container px-4" id="card-dropdown-container">
            <CardDropdown label="Starting" footerGenerator={footerGenerator} cards={cardEras[0]} />
            <CardDropdown label="Tier 1" footerGenerator={footerGenerator} cards={cardEras[1]} />
            <CardDropdown label="Tier 2" footerGenerator={footerGenerator} cards={cardEras[2]} />
            <CardDropdown label="Tier 3" footerGenerator={footerGenerator} cards={cardEras[3]} />
            <CardDropdown label="Misc" footerGenerator={footerGenerator} cards={cardEras[4]} />
        </div>
    </>;
}

export default CardHolder;
