import { useState } from 'react';
import Resources from './Resources.tsx';

function Card({cardId, card, converter_idx, footerGenerator}) {
    const [upgraded, setUpgraded] = useState(false);
    
    const converter = card.converters[converter_idx];
    const input = upgraded ? converter.upgrade_input : converter.input;
    const output = upgraded ? converter.upgrade_output : converter.output;

    const footer = footerGenerator(cardId, converter, upgraded, setUpgraded);

    return <>
        <div className="col">
            <div className="col card converter text-center" data-faction={card.faction}>
                <div className="card-header">
                    <span className="converter-name">{card.name}</span>
                </div>
                <div className="card-body">
                    <span className="converter-inputs">
                        <Resources resources={input} />
                    </span>
                    <img class="converter-arrow" src="assets/icons/white_arrow.png" alt="arrow" />
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
