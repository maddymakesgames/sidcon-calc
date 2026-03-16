import FactionSelect from './FactionSelect.tsx';

function GameSettings({setFaction, setTurn, setPlayerCount}) {
    function onTurn(e) {
        setTurn(parseInt(e.target.value));
    }

    function onPlayerCount(e) {
        setPlayerCount(parseInt(e.target.value));
    }

    return <>
        <form className="row">
            <div className="col input-group">
                <FactionSelect setFaction={setFaction} />
            </div>
            <div className="col input-group">
                <label htmlFor="turn-input" className="input-group-text">Current Turn:</label>
                <input className="form-control" id="turn-input" type="number" value={1} min={1} max={6} onInput={onTurn} />
            </div>
            <div className="col input-group">
                <label htmlFor="player-input" className="input-group-text">Player Count:</label>
                <input className="form-control" id="player-input" type="number" value={3} min={3} max={9} onInput={onPlayerCount} />
            </div>
        </form>
    </>
}

export default GameSettings;
