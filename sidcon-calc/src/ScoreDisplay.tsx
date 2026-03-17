import CubesInputHolder from './CubesInputHolder.tsx';
import { RESOURCES, countsToTotals } from './ResourceUtils.tsx';
import { useState } from 'react';

function calculateScore(totals) {
    const total = RESOURCES.reduce((newTotal, resourceName) => {
        const owned = totals.owned?.[resourceName] ?? 0;
        const donations = totals.donation?.[resourceName] ?? 0;
        newTotal[resourceName] = owned + donations;
        return newTotal;
    }, {});

    let smalls = total.white + total.brown + total.green + total.wsmall + total.ships;
    let larges = total.black + total.blue + total.yellow + total.wlarge;
    let vp = total.vp + Math.floor(smalls / 6) + Math.floor(larges / 4) + Math.floor(total.ultratech / 2);
    let partials = (smalls % 6) * 2 + (larges % 4) * 3 + (total.ultratech % 2) * 6;

    vp += Math.floor(partials / 12);
    partials = partials % 12;

    return {
        vp: vp,
        partial: partials
    };
}

function addTotals(t1, t2) {
    const owned = RESOURCES.reduce((ownedTotals, resourceName) => {
        const t1Resource = t1["owned"]?.[resourceName] ?? 0;
        const t2Resource = t2["owned"]?.[resourceName] ?? 0;
        ownedTotals[resourceName] = t1Resource + t2Resource;
        return ownedTotals;
    }, {});
    const donation = RESOURCES.reduce((donationTotals, resourceName) => {
        const t1Resource = t1["donations"]?.[resourceName] ?? 0;
        const t2Resource = t2["donations"]?.[resourceName] ?? 0;
        donationTotals[resourceName] = t1Resource + t2Resource;
        return donationTotals;
    }, {});
    return {
        owned: owned,
        donations: donation,
    };
}

function subTotals(t1, t2) {
    const owned = RESOURCES.reduce((ownedTotals, resourceName) => {
        const t1Resource = t1["owned"][resourceName] ?? 0;
        const t2Resource = t2["owned"][resourceName] ?? 0;
        ownedTotals[resourceName] = t1Resource - t2Resource;
        return ownedTotals;
    }, {});
    const donation = RESOURCES.reduce((donationTotals, resourceName) => {
        const t1Resource = t1["donations"]?.[resourceName] ?? 0;
        const t2Resource = t2["donations"]?.[resourceName] ?? 0;
        donationTotals[resourceName] = t1Resource - t2Resource;
        return donationTotals;
    }, {});
    return {
        owned: owned,
        donations: donation,
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

    let totals = {owned: countsToTotals(resourceCounts), donations: {} };
    let net = {};
    
    for(let convDetails of Object.values(runningConverters)) {
        let converter = convDetails.converter;
        let upgraded = convDetails.upgraded;

        let outputs = upgraded ? converter.upgrade_output : converter.output;
        let inputs = upgraded ? converter.upgrade_input : converter.input;

        console.log(totals);
        console.log(net);

        totals = addTotals(totals, outputs);
        net = addTotals(net, outputs);
        net = subTotals(net, outputs);
    }
    console.log(totals);
    console.log(net);
    
    let score = calculateScore(totals);

    // TODO: actually display total & net cubes

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
