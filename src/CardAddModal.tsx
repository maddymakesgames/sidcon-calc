import { useState } from 'react';
import FactionSelect from './FactionSelect.tsx';
import type { CardDef } from './types';
import CardHolder from './CardHolder.tsx';
import { getCard } from './Utils.tsx';
import { CardAddFooterGenerator } from './CardAddFooter.tsx';


interface Inputs {
    curFaction: string,
    ownedCards: CardDef[],
    setOwnedCards: (ownedCards: CardDef[]) => void,
    setVisible: (visible: boolean) => void
};

export default function CardAddModal({curFaction, ownedCards, setOwnedCards, setVisible}: Inputs) {
    const [selectedFaction, setSelectedFaction] = useState(curFaction);
    const [cardsToAdd, setCardsToAdd] = useState<{[id: string]: [number, string]}>({});

    const unownedCards = [];

    const faction_data = globalThis.all_cards[selectedFaction];

    for (const key of ["tech_cards", "unique_cards", "starting_cards"] as const) {
        if (!(key in faction_data)) {
            continue;
        }

        for (const [id, card] of Object.entries(faction_data[key])) {
            // This could be slow when a lot of cards are owned but I don't think its an issue
            if(ownedCards.some(c => c.id == id)) {
                continue;
            }

            unownedCards.push(card);
        }
    }

    const footerGenerator = CardAddFooterGenerator(cardsToAdd, setCardsToAdd);
    // TODO: its way too much effort to rework this so FOR NOW you can only add whole cards, not individual converters
    // in most cases this isn't an issue so like, I'm going to say its fine
    //
    // THIS WILL CHANGE EVENTUALLY I'm just too far into this rewrite to change it now
    const addCards = () => {
        for(const [ttl, cardID] of Object.values(cardsToAdd)) {
            const card = getCard(cardID);

            // Set all converters to have the same TTL
            // This will change when we change to allow adding individual converters
            for(const converter of card.converters) {
                converter.ttl = ttl;
            }

            setOwnedCards([
                ...ownedCards,
                card
            ]);
        }

        setVisible(false);
    };

    const close = () => {
        setVisible(false);
    };

    return <>
        <FactionSelect setFaction={setSelectedFaction} />
        <CardHolder currFaction={selectedFaction} ownedCards={unownedCards} footerGenerator={footerGenerator} />
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>Close</button>
            <button type="button" className="btn btn-primary" onClick={addCards}>Add</button>
        </div>
    </>;
}
