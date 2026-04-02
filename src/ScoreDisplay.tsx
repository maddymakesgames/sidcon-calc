import CubesInputHolder from './CubesInputHolder.tsx';
import TotalDisplay from './TotalDisplay.tsx';
import { RESOURCES, countsToTotals, type ResourceCounts } from './ResourceUtils.ts';
import { useState } from 'react';
import type { RunningConverter } from './App.tsx';
import type { ConverterResources, Resources } from './types';

function calculateScore(total: Resources): { vp: number, partial: number } {
    const smalls = total.white + total.brown + total.green + total.wsmall + total.ships;
    const larges = total.black + total.blue + total.yellow + total.wlarge;
    let vp = total.vp + Math.floor(smalls / 6) + Math.floor(larges / 4) + Math.floor(total.ultratech / 2);
    let partials = (smalls % 6) * 2 + (larges % 4) * 3 + (total.ultratech % 2) * 6;

    vp += Math.floor(partials / 12);
    partials = partials % 12;

    return {
        vp: vp,
        partial: partials
    };
}

function totalCubes(t: ConverterResources): Resources {
    return RESOURCES.reduce((total, resourceName) => {
        const owned = t.owned?.[resourceName] ?? 0;
        const donations = t.donations?.[resourceName] ?? 0;
        total[resourceName] = owned + donations;
        return total;
    }, {} as Resources);
}

function emptyTotals(): ConverterResources {
    const owned = RESOURCES.reduce((owned_totals, resource_name) => {
        owned_totals[resource_name] = 0;
        return owned_totals;
    }, {} as Resources);
    const donation = RESOURCES.reduce((donation_totals, resource_name) => {
        donation_totals[resource_name] = 0;
        return donation_totals;
    }, {} as Resources);
    return {
        owned: owned,
        donations: donation,
    };

}

function addTotals(t1: ConverterResources, t2: ConverterResources): ConverterResources {
    const owned = RESOURCES.reduce((ownedTotals, resourceName) => {
        const t1Resource = t1["owned"]?.[resourceName] ?? 0;
        const t2Resource = t2["owned"]?.[resourceName] ?? 0;
        ownedTotals[resourceName] = t1Resource + t2Resource;
        return ownedTotals;
    }, {} as Resources);
    const donation = RESOURCES.reduce((donationTotals, resourceName) => {
        const t1Resource = t1["donations"]?.[resourceName] ?? 0;
        const t2Resource = t2["donations"]?.[resourceName] ?? 0;
        donationTotals[resourceName] = t1Resource + t2Resource;
        return donationTotals;
    }, {} as Resources);
    return {
        owned: owned,
        donations: donation,
    };
}

function subTotals(t1: ConverterResources, t2: ConverterResources): ConverterResources {
    const owned = RESOURCES.reduce((ownedTotals, resourceName) => {
        const t1Resource = t1["owned"][resourceName] ?? 0;
        const t2Resource = t2["owned"][resourceName] ?? 0;
        ownedTotals[resourceName] = t1Resource - t2Resource;
        return ownedTotals;
    }, {} as Resources);
    const donation = RESOURCES.reduce((donationTotals, resourceName) => {
        const t1Resource = t1["donations"]?.[resourceName] ?? 0;
        const t2Resource = t2["donations"]?.[resourceName] ?? 0;
        donationTotals[resourceName] = t1Resource - t2Resource;
        return donationTotals;
    }, {} as Resources);
    return {
        owned: owned,
        donations: donation,
    };
}

interface Inputs {
    runningConverters: { [id: string]: RunningConverter }
}

function ScoreDisplay({ runningConverters }: Inputs) {
    const [resourceCounts, setCounts] = useState<ResourceCounts>(new Array(RESOURCES.length).fill(0) as ResourceCounts);
    const countSetters = RESOURCES.map((_res, i) => {
        return (value: number) => {
            const newRes = Array.from(resourceCounts);
            newRes[i] = value;
            setCounts(newRes as ResourceCounts);
        };
    });

    let totals = emptyTotals();
    let net = emptyTotals();

    const rotting = { owned: countsToTotals(resourceCounts), donations: {} };

    totals = addTotals(totals, rotting);
    net = addTotals(totals, rotting);
    
    for(const convDetails of Object.values(runningConverters)) {
        const converter = convDetails.converter;
        const upgraded = convDetails.upgraded;

        const outputs = upgraded ? converter.upgrade_output : converter.output;
        const inputs = upgraded ? converter.upgrade_input : converter.input;

        console.log(totals);
        console.log(net);

        totals = addTotals(totals, outputs);
        net = addTotals(net, outputs);
        net = subTotals(net, inputs);
    }
    console.log(totals);
    console.log(net);
    
    const score = calculateScore(totalCubes(totals));

    RESOURCES.forEach((resource) => {
        if((totals.owned?.[resource] ?? 0) < 0) {
            totals.owned[resource] = 0;
        }

        if((totals.donations?.[resource] ?? 0) < 0) {
            totals.donations[resource] = 0;
        }
    })

    console.log(totals);
    console.log(net);

    return <>
        <div className="container">
            <CubesInputHolder resourceCounts={resourceCounts} countSetters={countSetters} />
            <br />
            <div id="totals-holder">
                <h4>Total Cubes:</h4>
                <div className="row">
                    <TotalDisplay total={totals.owned} header="Owned:" />
                    <TotalDisplay total={totals.donations} header="Donations:" />
                    <TotalDisplay total={totalCubes(totals)} header="Total:" />
                </div>
                <hr />
                <h4>Net:</h4>
                <div className="row">
                    <TotalDisplay total={net.owned} header="Owned:" />
                    <TotalDisplay total={net.donations} header="Donations:" />
                    <TotalDisplay total={totalCubes(net)} header="Total:" />
                </div>
            </div>
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
