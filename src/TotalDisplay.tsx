import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RESOURCES, CLASSNAMES, FILENAMES } from './ResourceUtils.ts';
import type { Resources } from './types';

interface Inputs {
    total: Resources,
    header: string
}

export default function TotalDisplay({total, header}: Inputs) {
    const resources_html = RESOURCES.map((resource_name) => {
        // Don't display asmall and awild, since theyre implementation details
        if(resource_name.startsWith('a')) {
            return <></>;
        }

        const classname = CLASSNAMES[resource_name];
        const filename = "assets/icons/" + FILENAMES[resource_name];
        const count = total[resource_name];
        const color_class = count < 0 ? "text-danger" : count > 0 ? "text-success" : "";
        return <>
            <Col sm key={`${header}${resource_name}`}>
                <span className={color_class}>{count}</span>
                <img className={`centered ${classname}`} src={filename} alt={classname} />
            </Col>
        </>;
    });

    return <>
        <Col xs={4} md={12}>
            <Row>
                <Col sm={2}>{header}</Col>{resources_html}
            </Row>
        </Col>
    </>;
    
}
