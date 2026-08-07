import type { CardDef } from "./types";

export function isEmptyObject(obj: object) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

export function getCard(cardID: string): CardDef {
    const [faction, card] = cardID.split('$');
    if(card.startsWith('starting')) {
        return globalThis.all_cards[faction].starting_cards[cardID];
    } else if(card.startsWith('unique')) {
        return globalThis.all_cards[faction].unique_cards[cardID];
    } else {
        return globalThis.all_cards[faction].tech_cards[cardID];
    }
}

export function converterID(cardID: string, converter: number): string {
    return `${cardID}$${converter}`;
}
