import { RESOURCES, CLASSNAMES, FILENAMES } from './ResourceUtils.ts';
import type { Resources } from './types';

interface Inputs {
    total: Resources,
    header: string
}

export default function TotalDisplay({total, header}: Inputs) {
    const resources_html = RESOURCES.map((resource_name) => {
        const classname = CLASSNAMES[resource_name];
        const filename = "assets/icons/" + FILENAMES[resource_name];
        const count = total[resource_name];
        const color_class = count < 0 ? "text-danger" : count > 0 ? "text-success" : "";
        return <>
            <div className="col-sm" key={`${header}${resource_name}`}>
                <span className={color_class}>{count}</span>
                <img className={`centered ${classname}`} src={filename} alt={classname} />
            </div>
        </>;
    });

    return <>
        <div className="col-4 col-md-12">
            <div className="row">
                <div className="col-sm-2">{header}</div>{resources_html}
            </div>
        </div>
    </>;
    
}
