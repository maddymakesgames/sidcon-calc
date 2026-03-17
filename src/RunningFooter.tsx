import { useState } from 'react';

export function RunningFooterGenerator(runningConverters, setRunningConverters) {
    return (cardID, converter, upgraded, setUpgraded) => {
        return <>
            <RunningFooter cardID={cardID} converter={converter}
                upgraded={upgraded} setUpgraded={setUpgraded} 
                runningConverters={runningConverters} setRunningConverters={setRunningConverters} 
            />
        </>;
    };
}

function RunningFooter({cardID, converter, upgraded, setUpgraded, runningConverters, setRunningConverters}) {
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
