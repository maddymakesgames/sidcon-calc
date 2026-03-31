import { resource_icon } from './ResourceUtils.tsx';
import { isEmptyObject } from './Utils.tsx';
import type { ConverterResources, Resources } from './types';

interface Inputs {
    resources: ConverterResources
}

function Resources({resources}: Inputs) {
    const output = [];
    if(!isEmptyObject(resources.owned)) {
        const icons = Object.typedEntries<Resources>(resources.owned).map(r => resource_icon(r, false));
        output.push(...icons);
    }

    if(!isEmptyObject(resources.donations)) {
        const icons = Object.typedEntries<Resources>(resources.donations).map(r => resource_icon(r, true));
        output.push(...icons);
    }

    return <>
        {output}
    </>;
}

export default Resources;
