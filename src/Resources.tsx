import { resource_icon } from './ResourceUtils.tsx';
import { isEmptyObject } from './Utils.tsx';

function Resources({resources}) {
    let output = [];
    if(!isEmptyObject(resources.owned)) {
        let icons = Object.entries(resources.owned).map(r => resource_icon(r, false));
        output.push(...icons);
    }

    if(!isEmptyObject(resources.donations)) {
        let icons = Object.entries(resources.donations).map(r => resource_icon(r, true));
        output.push(...icons);
    }

    return <>
        {output}
    </>;
}

export default Resources;
