
function FactionSelect({setFaction}) {
    let data = global.all_cards;
    
    let options = [];
    for(let faction of Object.values(data)) {
        let option = <option key={faction.id} value={faction.id}>
            {faction.name}
        </option>;

        options.push(option);
    }

    return (<>
        <div className="col input-group">
            <label htmlFor="faction-select" className="input-group-text">Faction:</label>
            <select className="form-select faction-select" id="faction-select" onInput={e => setFaction(e.target.value)}>
                {options}
            </select>
        </div>
    </>);
}

export default FactionSelect;
