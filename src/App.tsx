import './App.css';
import GameSettings from './Settings.tsx';
import CardHolder from './CardHolder.tsx';
import ScoreDisplay from './ScoreDisplay.tsx';
import { useState } from 'react';

function App() {
    const starting_faction = Object.values(global.all_cards)[0];
    const [currFaction, setFactionRaw] = useState(starting_faction.id);
    const [ownedCards, setOwnedCards] = useState(starting_faction.starting_cards);
    const [runningConverters, setRunningConverters] = useState({});

    const setFaction = (faction) => {
        setFactionRaw(faction);
        setOwnedCards(global.all_cards[faction].starting_cards);
    }

    return (
        <>
            <div>
                <GameSettings setFaction={setFaction} setTurn={(_v)=>{}} setPlayerCount={(_v)=>{}}/>
                <CardHolder currFaction={currFaction} ownedCards={ownedCards} runningConverters={runningConverters} setRunningConverters={setRunningConverters} />
                <ScoreDisplay runningConverters={runningConverters} />
            </div>
        </>
    );
}

export default App
