import { useState, type JSX } from 'react';
import Resources from './Resources.tsx';
import type { CardDef, Converter } from './types';

interface Inputs {
    cardID: string,
    card: CardDef,
    converter_idx: number,
    footerGenerator: FooterGenerator
}

export type FooterGeneratorParams = {
    cardID: string,
    converter: Converter,
    upgraded: boolean,
    setUpgraded: (upgraded: boolean) => void
};
export type FooterGenerator = (cardId: string, converter: Converter, upgraded: boolean, setUpgraded: (upgraded: boolean) => void) => JSX.Element;

function Card({cardID, card, converter_idx, footerGenerator}: Inputs) {
    const [upgraded, setUpgraded] = useState(false);
    
    const converter = card.converters[converter_idx];
    const input = upgraded ? converter.upgrade_input : converter.input;
    const output = upgraded ? converter.upgrade_output : converter.output;

    const footer = footerGenerator(cardID, converter, upgraded, setUpgraded);

    return <>
        <div className="col">
            <div className="col card converter text-center" data-faction={card.owner}>
                <div className="card-header">
                    <span className="converter-name">{card.name}</span>
                </div>
                <div className="card-body">
                    <span className="converter-inputs">
                        <Resources resources={input} />
                    </span>
                    <img className="converter-arrow" src="assets/icons/white_arrow.png" alt="arrow" />
                    <span className="converter-outputs">
                        <Resources resources={output} />
                    </span>
                </div>
                {footer}
            </div>
        </div>
    </>;
}

export default Card;
