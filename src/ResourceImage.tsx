import type { JSX } from "react";
import { FILENAMES, type ResourceType } from "./ResourceUtils";

export function resourceImage(resource: ResourceType): JSX.Element {
    const icon = `assets/icons/${FILENAMES[resource]}`;
    let classes = "centered";

    switch(resource) {
        case 'white':
        case 'green':
        case 'brown':
        case 'wsmall':
        case 'asmall':
            classes += " small-cube-text small-cube";
            break;
        case 'yellow':
        case 'blue':
        case 'black':
        case 'wlarge':
        case 'alarge':
            classes += " large-cube-text large-cube";
            break;
        case 'ultratech':
            classes += " large-cube";
            break;
        case 'ships':
            classes += " ship";
            break;
        case 'vp':
            classes += " victory-point";
            break;
    }
    

    return <img src={icon} alt="" className={classes} />;
}
