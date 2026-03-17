import { resource_icon } from './ResourceUtils.tsx';
import { isEmptyObject } from './Utils.tsx';

function Resources({resources}) {
    const output = [];
    if(!isEmptyObject(resources.owned)) {
        const icons = Object.entries(resources.owned).map(r => resource_icon(r, false));
        output.push(...icons);
    }

    if(!isEmptyObject(resources.donations)) {
        const icons = Object.entries(resources.donations).map(r => resource_icon(r, true));
        output.push(...icons);
    }

    return <>
        {output}
    </>;
}

export default Resources;
