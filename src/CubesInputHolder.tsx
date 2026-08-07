import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CubeInput from './CubeInput.tsx';

interface Inputs {
    resourceCounts: number[],
    countSetters: ((count: number) => void)[]
}

function CubesInputHolder({resourceCounts, countSetters}: Inputs) {
        return <Form>
                <Row className="text-center">
                    <h4>Current Resources</h4>
                </Row>
                <Row className="mb-2">
                    <CubeInput resource='white' setCount={countSetters[0]} currentValue={resourceCounts[0]} />
                    <CubeInput resource='green' setCount={countSetters[1]} currentValue={resourceCounts[1]} />
                    <CubeInput resource='brown' setCount={countSetters[2]} currentValue={resourceCounts[2]} />
                    <CubeInput resource='wsmall' setCount={countSetters[3]} currentValue={resourceCounts[3]} />
                </Row>
                <Row className="mb-2">
                    <CubeInput resource='yellow' setCount={countSetters[5]} currentValue={resourceCounts[5]} />
                    <CubeInput resource='blue' setCount={countSetters[6]} currentValue={resourceCounts[6]} />
                    <CubeInput resource='black' setCount={countSetters[7]} currentValue={resourceCounts[7]} />
                    <CubeInput resource='wlarge' setCount={countSetters[8]} currentValue={resourceCounts[8]} />
                </Row>
                <Row className="mb-2">
                    <CubeInput resource='ultratech' setCount={countSetters[10]} currentValue={resourceCounts[10]} />
                    <CubeInput resource='vp' setCount={countSetters[11]} currentValue={resourceCounts[11]} />
                    <CubeInput resource='ships' setCount={countSetters[12]} currentValue={resourceCounts[12]} />
                </Row>
            </Form>;
}

export default CubesInputHolder;

