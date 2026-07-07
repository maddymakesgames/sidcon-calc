import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import type { ConverterDef } from "./types";
import type { FooterGeneratorParams } from "./ConverterCard.tsx";

export function CardAddFooterGenerator(cardsToAdd: {[id: string]: [number, string]}, setCardsToAdd: (cards: {[id: string]: [number, string]}) => void) {
    return (cardID: string, converter: ConverterDef, setHighlighted: (highlighted: boolean) => void, upgraded: boolean, setUpgraded: (upgraded: boolean) => void,) =>  
        <>
            <CardAddFooter converterID={cardID} converter={converter} setHighlighted={setHighlighted}
                           upgraded={upgraded} setUpgraded={setUpgraded} 
                           cardsToAdd={cardsToAdd} setCardsToAdd={setCardsToAdd} />
        </>
}

interface Inputs extends FooterGeneratorParams {
    cardsToAdd: {[id: string]: [number, string]}, 
    setCardsToAdd: (cards: {[id: string]: [number, string]}) => void
}

function CardAddFooter({converterID, cardsToAdd, setCardsToAdd, setHighlighted}: Inputs) {
    const [ttl, setTTL] = useState(6);
    const cardID = converterID.split('$').slice(0, 2).join('$');
    
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
            setHighlighted(false);
            setCardsToAdd(ctaCopy);
        } else {
            setHighlighted(true);
            setCardsToAdd({
                ...cardsToAdd,
                [cardID]: [ttl, cardID]
            });
        }
    }

    const buttonText = cardsToAdd[cardID] ? "Unselect" : "Select";

    return <>
        <Card.Footer className="d-flex flex-row">
            <InputGroup className="float-start w-50">
                <InputGroup.Text id="ttl-select">Rounds</InputGroup.Text>
                <Form.Select className="form-select" id="ttl-select" onInput={onTTLSelect}>
                    <option value='6'>∞</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </Form.Select>
            </InputGroup>
            <Button variant="light" className="ms-auto" onClick={toggleToAdd}>{buttonText}</Button>
        </Card.Footer>
    </>;
}
