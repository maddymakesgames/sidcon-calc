import { useState } from 'react';
import type { FooterGenerator, FooterGeneratorParams } from './Card';
import type { RunningConverter } from './App';

interface RunningConverters {
    [id: string]: RunningConverter
}

export function RunningFooterGenerator(runningConverters: RunningConverters, setRunningConverters: (rc: RunningConverters) => void): FooterGenerator {
    return (cardID, converter, upgraded, setUpgraded) => {
        return <>
            <RunningFooter cardID={cardID} converter={converter}
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

function RunningFooter({cardID, converter, upgraded, setUpgraded, runningConverters, setRunningConverters}: Inputs) {
    const [running, setRunning] = useState(false);
    const runningText = running ? "Unmark Running" : "Mark Running";
    const upgradeText = upgraded ? "Downgrade" : "Upgrade";
    
    const runningFunc = () => {
        if(running && runningConverters[cardID]) {
            const rcCopy = { ...runningConverters };
            delete rcCopy[cardID];
            setRunningConverters(rcCopy);
        } else if(!running) {
            setRunningConverters({
                ...runningConverters,
                [cardID]: {
                    converter: converter, 
                    upgraded: upgraded 
                }
            });
        }

        setRunning(!running);
    };

    const upgradeFunc = () => {
        upgraded = !upgraded;
        if(runningConverters[cardID]) {
            setRunningConverters({
                ...runningConverters,
                [cardID]: {
                    ...runningConverters[cardID],
                    upgraded: upgraded
                }
            });
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
