import './App.css';
import GameSettings from './Settings.tsx';
import CardHolder from './CardHolder.tsx';
import ScoreDisplay from './ScoreDisplay.tsx';
import { RunningFooterGenerator } from './RunningFooter.tsx';
import { useState } from 'react';
import type { Converter } from './types';

export interface RunningConverter {
    converter: Converter,
    upgraded: boolean
}

function App() {
    const startingFaction = Object.values(globalThis.all_cards)[0];
    const [currFaction, setFactionRaw] = useState(startingFaction.id);
    const [ownedCards, setOwnedConverters] = useState(Object.values(startingFaction.starting_cards));
    const [runningConverters, setRunningConverters] = useState<{[id: string]: RunningConverter}>({});
    
    const footerGenerator = RunningFooterGenerator(runningConverters, setRunningConverters);

    const setFaction = (faction: string) => {
        setFactionRaw(faction);
        setOwnedConverters(Object.values(globalThis.all_cards[faction].starting_cards));
    }

    return (
        <>
            <div>
                <GameSettings setFaction={setFaction} setTurn={(_v: unknown)=>{}} setPlayerCount={(_v: unknown)=>{}}/>
                <CardHolder currFaction={currFaction} ownedCards={ownedCards} footerGenerator={footerGenerator} />
                <ScoreDisplay runningConverters={runningConverters} />
            </div>
        </>
    );
}

export default App
