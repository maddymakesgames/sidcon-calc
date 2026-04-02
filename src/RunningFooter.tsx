import { useState } from 'react';
import type { FooterGenerator, FooterGeneratorParams } from './Card';
import type { RunningConverter } from './App';

interface RunningConverters {
    [id: string]: RunningConverter
}

export function RunningFooterGenerator(runningConverters: RunningConverters, setRunningConverters: (rc: RunningConverters) => void): FooterGenerator {
    return (converterID, converter, setHighlighted, upgraded, setUpgraded) => {
        return <>
            <RunningFooter converterID={converterID} converter={converter} setHighlighted={setHighlighted}
                upgraded={upgraded} setUpgraded={setUpgraded} 
                runningConverters={runningConverters} setRunningConverters={setRunningConverters} 
            />
        </>;
    };
}

interface Inputs extends FooterGeneratorParams {
    runningConverters: RunningConverters,
    setRunningConverters: (rc: RunningConverters) => void
}

function RunningFooter({converterID, converter, setHighlighted, upgraded, setUpgraded, runningConverters, setRunningConverters}: Inputs) {
    const [running, setRunning] = useState(false);
    const runningText = running ? "Unmark Running" : "Mark Running";
    const upgradeText = upgraded ? "Downgrade" : "Upgrade";
    const cardID = converterID.split('$').slice(0, 2).join('$');
    
    const runningFunc = () => {
        if(running && runningConverters[converterID]) {
            const rcCopy = { ...runningConverters };
            delete rcCopy[converterID];
            setHighlighted(false);
            setRunningConverters(rcCopy);
        } else if(!running) {
            setHighlighted(true);
            setRunningConverters({
                ...runningConverters,
                [converterID]: {
                    converter: converter, 
                    upgraded: upgraded 
                }
            });
        }

        setRunning(!running);
    };

    const upgradeFunc = () => {
        upgraded = !upgraded;
        if(runningConverters[converterID]) {
            setRunningConverters({
                ...runningConverters,
                [converterID]: {
                    ...runningConverters[converterID],
                    upgraded: upgraded
                }
            });
        }

        const shared = Object.keys(runningConverters).filter(k => k.startsWith(cardID));

        if(shared.length > 0) {
            const rcCopy = { ...runningConverters };
            for(const id of shared) {
                rcCopy[id].upgraded = upgraded;
            }
            setRunningConverters(rcCopy);
        }

        setUpgraded(upgraded);
    };


    return <>
        <div className="card-footer">
            <button className="btn btn-light float-start" onClick={upgradeFunc}>{upgradeText}</button>
            <button className="btn btn-light float-end" onClick={runningFunc}>{runningText}</button>
        </div>
    </>;
}
