import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CubesInputHolder from './CubesInputHolder.tsx';
import TotalDisplay from './TotalDisplay.tsx';
import { RESOURCES, addTotals, calculateScore, countsToTotals, emptyTotals, subTotals, totalCubes, type ResourceCounts } from './ResourceUtils.ts';
import { useState } from 'react';
import type { RunningConverter } from './App.tsx';
import type { ConverterResources } from './types';


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

    const rotting = { owned: countsToTotals(resourceCounts), donations: {} } as ConverterResources;

    totals = addTotals(totals, rotting);
    net = addTotals(totals, rotting);
    
    for(const convDetails of Object.values(runningConverters)) {
        const converter = convDetails.converter;
        const upgraded = convDetails.upgraded;

        const outputs = upgraded ? converter.upgrade_output : converter.output;
        const inputs = upgraded ? converter.upgrade_input : converter.input;

        totals = addTotals(totals, outputs);
        net = addTotals(net, outputs);
        net = subTotals(net, inputs);
    }
    
    const score = calculateScore(totalCubes(totals));

    RESOURCES.forEach((resource) => {
        if((totals.owned?.[resource] ?? 0) < 0) {
            totals.owned[resource] = 0;
        }

        if((totals.donations?.[resource] ?? 0) < 0) {
            totals.donations[resource] = 0;
        }
    })

    return <>
        <Container>
            <CubesInputHolder resourceCounts={resourceCounts} countSetters={countSetters} />
            <br />
            <div id="totals-holder">
                <h4>Total Cubes:</h4>
                <Row>
                    <TotalDisplay total={totals.owned} header="Owned:" />
                    <TotalDisplay total={totals.donations} header="Donations:" />
                    <TotalDisplay total={totalCubes(totals)} header="Total:" />
                </Row>
                <hr />
                <h4>Net:</h4>
                <Row>
                    <TotalDisplay total={net.owned} header="Owned:" />
                    <TotalDisplay total={net.donations} header="Donations:" />
                    <TotalDisplay total={totalCubes(net)} header="Total:" />
                </Row>
            </div>
            <br />
            <div className="input-row">
                <h5 id="score">
                Final Score: {score.vp} + <sup>{score.partial}</sup>/<sub>12</sub>
                </h5>
            </div>
            <br />
        </Container>
    </>;
}

export default ScoreDisplay;
