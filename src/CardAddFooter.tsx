import { useState } from "react";
import type { Converter } from "./types";

export function CardAddFooterGenerator(cardsToAdd: {[id: string]: [number, string]}, setCardsToAdd: (cards: {[id: string]: [number, string]}) => void) {
    return (cardID: string, converter: Converter, upgraded: boolean, setUpgraded: (upgraded: boolean) => void,) =>  
        <>
            <CardAddFooter cardID={cardID} converter={converter} 
                           upgraded={upgraded} setUpgraded={setUpgraded} 
                           cardsToAdd={cardsToAdd} setCardsToAdd={setCardsToAdd} />
        </>
}

interface Inputs {
    cardID: string, 
    converter: Converter, 
    upgraded: boolean, 
    setUpgraded: (upgraded: boolean) => void, 
    cardsToAdd: {[id: string]: [number, string]}, 
    setCardsToAdd: (cards: {[id: string]: [number, string]}) => void
}

function CardAddFooter({cardID, cardsToAdd, setCardsToAdd}: Inputs) {
    const [ttl, setTTL] = useState(6);
    
    const onTTLSelect = (e: React.InputEvent<HTMLSelectElement>) => {
        if(cardsToAdd[cardID]) {
            setCardsToAdd({
                ...cardsToAdd,
                [cardID]: [ttl, cardID]
            });
        }

        setTTL(parseInt((e.target as HTMLSelectElement).value));
    };

    const toggleToAdd = () => {
        if(cardsToAdd[cardID]) {
            const ctaCopy = {...cardsToAdd};
            delete ctaCopy[cardID];
            setCardsToAdd(ctaCopy);
        } else {
            setCardsToAdd({
                ...cardsToAdd,
                [cardID]: [ttl, cardID]
            });
        }
    }

    const buttonText = cardsToAdd[cardID] ? "Unselect" : "Select";

    return <>
        <label htmlFor="ttl-select">Rounds</label>
        <select className="form-select" id="ttl-select" onInput={onTTLSelect}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>∞</option>
        </select>
        <button className="btn btn-light float-end" onClick={toggleToAdd}>{buttonText}</button>
    </>;
}
