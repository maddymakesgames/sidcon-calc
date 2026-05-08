import GameSettings from './Settings.tsx';
import CardHolder from './CardHolder.tsx';
import ScoreDisplay from './ScoreDisplay.tsx';
import { RunningFooterGenerator } from './RunningFooter.tsx';
import { Activity, useState } from 'react';
import type { ConverterDef } from './types';
import CardAddModal from './CardAddModal.tsx';

export interface RunningConverter {
    converter: ConverterDef,
    upgraded: boolean
}

function App() {
    const startingFaction = Object.values(globalThis.all_cards)[0];
    const [currFaction, setFactionRaw] = useState(startingFaction.id);
    const [ownedCards, setOwnedCards] = useState(Object.values(startingFaction.starting_cards));
    const [runningConverters, setRunningConverters] = useState<{[id: string]: RunningConverter}>({});
    const [modalVisible, setModalVisible] = useState(false);
    
    const footerGenerator = RunningFooterGenerator(runningConverters, setRunningConverters);

    const setFaction = (faction: string) => {
        setFactionRaw(faction);
        setOwnedCards(Object.values(globalThis.all_cards[faction].starting_cards));
    }

    return (
        <>
            <Activity mode={modalVisible ? "hidden" : "visible"}>
                <GameSettings setFaction={setFaction} setTurn={(_v: unknown)=>{}} setPlayerCount={(_v: unknown)=>{}}/>
                <hr />
                <CardHolder currFaction={currFaction} ownedCards={ownedCards} footerGenerator={footerGenerator} />
                <div className="container">
                    <div className="row" data-bs-target="#card_selector" onClick={() => setModalVisible(true)}>
                        <div className="col card" id="add-card">
                            <h2>+ Add Converter(s)</h2>
                        </div>
                    </div>
                </div>
                <hr />
                <ScoreDisplay runningConverters={runningConverters} />
            </Activity>
            {modalVisible && (
                <CardAddModal curFaction={currFaction} ownedCards={ownedCards} setOwnedCards={setOwnedCards} setVisible={setModalVisible} />
            )}
        </>
    );
}

export default App
