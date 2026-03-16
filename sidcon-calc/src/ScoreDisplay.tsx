import CubesInputHolder from './CubesInputHolder.tsx';
import { RESOURCES, countsToTotals } from './ResourceUtils.tsx';
import { useState } from 'react';

function calculateScore(totals) {
    let smalls = totals.white + totals.brown + totals.green + totals.wsmall + totals.ships;
    let larges = totals.black + totals.blue + totals.yellow + totals.wlarge;
    let vp = totals.vp + Math.floor(smalls / 6) + Math.floor(larges / 4) + Math.floor(totals.ultratech / 2);
    let partials = (smalls % 6) * 2 + (larges % 4) * 3 + (totals.ultratech % 2) * 6;

    vp += Math.floor(partials / 12);
    partials = partials % 12;

    return {
        vp: vp,
        partial: partials
    };
}

function ScoreDisplay({ runningConverters }) {
    let [resourceCounts, setCounts] = useState(new Array(RESOURCES.length).fill(0));
    let countSetters = RESOURCES.map((_res, i) => {
        return (value) => {
            let newRes = Array.from(resourceCounts);
            newRes[i] = value;
            setCounts(newRes);
        };
    });

    let totals = countsToTotals(resourceCounts);
    let score = calculateScore(totals);



    return <>
        <div className="container">
            <CubesInputHolder resourceCounts={resourceCounts} countSetters={countSetters} />
            <br />
            <br />
            <div className="input-row">
                <h5 id="score">
                Final Score: {score.vp} + <sup>{score.partial}</sup>/<sub>12</sub>
                </h5>
            </div>
            <br />
        </div>
    </>;
}

export default ScoreDisplay;
