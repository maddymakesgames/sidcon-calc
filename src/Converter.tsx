import { useState } from "react";
import type { FooterGenerator } from "./Card";
import type { ConverterDef } from "./types";
import ResourceDisplay from "./ResourcesDisplay";

interface Inputs {
    name: string,
    converterID: string,
    converter: ConverterDef,
    footerGenerator: FooterGenerator
    upgraded: boolean,
    setUpgraded: (upgraded: boolean) => void
}

export default function Converter({name, converterID, converter, footerGenerator, upgraded, setUpgraded}: Inputs) {
    const [highlighted, setHighlighted] = useState(false);

    const input = upgraded ? converter.upgrade_input : converter.input;
    const output = upgraded ? converter.upgrade_output : converter.output;

    const footer = footerGenerator(converterID, converter, setHighlighted, upgraded, setUpgraded);

    let cardClasses = "col card converter text-center";

    if(highlighted) {
        cardClasses += ' running';
    }

    return <>
        <div className="col">
            <div className={cardClasses}>
                <div className="card-header">
                    <span className="converter-name">{name}</span>
                </div>
                <div className="card-body">
                    <span className="converter-inputs">
                        <ResourceDisplay resources={input} />
                    </span>
                    <img className="converter-arrow" src="assets/icons/white_arrow.png" alt="arrow" />
                    <span className="converter-outputs">
                        <ResourceDisplay resources={output} />
                    </span>
                </div>
                {footer}
            </div>
        </div>
    </>;
}


