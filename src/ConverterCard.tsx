import { Activity, useState, type JSX } from 'react';
import type { CardDef, ConverterDef } from './types';
import Converter from './Converter.tsx';
import { isConverterResourcesEmpty } from './ResourceUtils.ts';
import { converterID } from './Utils.tsx';

interface Inputs {
    card: CardDef,
    footerGenerator: FooterGenerator
}

export type FooterGeneratorParams = {
    converterID: string,
    converter: ConverterDef,
    setHighlighted: (highlighted: boolean) => void,
    upgraded: boolean,
    setUpgraded: (upgraded: boolean) => void
};
export type FooterGenerator = (cardID: string, converter: ConverterDef, setHighlighted: (highlighted: boolean) => void, upgraded: boolean, setUpgraded: (upgraded: boolean) => void) => JSX.Element;

function ConverterCard({card, footerGenerator}: Inputs) {
    const [upgraded, setUpgraded] = useState(false);

    const converters = [];

    const labelNames = card.converters.length > 1;
    for(let i = 0; i < card.converters.length; i++) {
        console.log(i);
        const converter = card.converters[i];
        const hidden = !upgraded && isConverterResourcesEmpty(converter.output);
        const rootName = upgraded ? card.upgrade_name : card.name;
        const name = labelNames ? `${rootName} ${String.fromCharCode(65 + i)}` : rootName;
        const id = converterID(card.id, i);
        converters.push(<>
            <Activity mode={hidden ? "hidden" : "visible"}>
                <Converter key={id} name={name} converterID={id} converter={converter} footerGenerator={footerGenerator} upgraded={upgraded} setUpgraded={setUpgraded} />
            </Activity>
        </>);
        
    }
    
    console.log(converters);

    return <>
        {converters}
    </>;
}

export default ConverterCard;
