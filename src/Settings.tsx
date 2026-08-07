import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FactionSelect from './FactionSelect.tsx';

interface Inputs {
    setFaction: (faction: string) => void,
    setTurn: (turn: number) => void,
    setPlayerCount: (playerCount: number) => void
}

function GameSettings({setFaction, setTurn, setPlayerCount}: Inputs) {
    function onTurn(e: React.InputEvent<HTMLInputElement>) {
        setTurn(parseInt((e.target as HTMLInputElement).value));
    }

    function onPlayerCount(e: React.InputEvent<HTMLInputElement>) {
        setPlayerCount(parseInt((e.target as HTMLInputElement).value));
    }

    return <>
        <Container className="mt-1 mb-1">
            <Row as={Form}>
                <Col as={InputGroup}>
                    <FactionSelect setFaction={setFaction} />
                </Col>
                <Col as={InputGroup}>
                    <InputGroup.Text id="turn-input">Current Turn:</InputGroup.Text>
                    <Form.Control aria-describedby="turn-input" type="number" defaultValue={1} min={1} max={6} onInput={onTurn} />
                </Col>
                <Col as={InputGroup}>
                    <InputGroup.Text id="player-input">Player Count:</InputGroup.Text>
                    <Form.Control aria-describedby="player-input" type="number" defaultValue={3} min={3} max={9} onInput={onPlayerCount} />
                </Col>
            </Row>
        </Container>
    </>
}

export default GameSettings;
