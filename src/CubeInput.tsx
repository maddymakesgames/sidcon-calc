import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { resourceImage } from './ResourceImage.tsx';
import { type ResourceType } from './ResourceUtils.ts';

interface Inputs {
    resource: ResourceType,
    setCount: (n: number) => void,
    currentValue: number
}

function CubeInput({resource, setCount, currentValue}: Inputs) {
    const image = resourceImage(resource);
    const inputID = resource + "-input";


    return <Col xs={6} md={3}>
               <InputGroup>
                   <InputGroup.Text id={inputID} as="label">
                       {image}
                   </InputGroup.Text>
                   <Form.Control id={inputID} type="number" value={currentValue} min={0} onInput={(e) => setCount(parseInt((e.target as HTMLInputElement).value))} />
               </InputGroup>
           </Col>;
}

export default CubeInput;
