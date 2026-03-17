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
    let [running, setRunning] = useState(false);
    let runningText = running ? "Unmark Running" : "Mark Running";
    let upgradeText = upgraded ? "Downgrade" : "Upgrade";
    
    let runningFunc = () => {
        if(running && runningConverters[cardID]) {
            let rcCopy = { ...runningConverters };
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

    let upgradeFunc = () => {
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
