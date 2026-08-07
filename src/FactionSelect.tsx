import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface Inputs {
    setFaction: (faction: string) => void
}

function FactionSelect({setFaction}: Inputs) {
    const data = globalThis.all_cards;
    
    const options = [];
    for(const faction of Object.values(data)) {
        const option = <option key={faction.id} value={faction.id}>
            {faction.name}
        </option>;

        options.push(option);
    }

    return (<>
        <InputGroup className="col">
            <InputGroup.Text id="faction-select">Faction:</InputGroup.Text>
            <Form.Select className="faction-select" id="faction-select" onInput={e => setFaction((e.target as HTMLSelectElement).value)}>
                {options}
            </Form.Select>
        </InputGroup>
    </>);
}

export default FactionSelect;
