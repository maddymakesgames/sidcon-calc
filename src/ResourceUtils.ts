import type { Resources } from "./types";

export const FILENAMES = {
    white: "white.png",
    green: "green.png",
    brown: "brown.png",
    wsmall: "small_grey.png",
    asmall: "small_any.png",
    yellow: "yellow.png",
    blue: "blue.png",
    black: "black.png",
    wlarge: "large_grey.png",
    alarge: "large_any.png",
    ultratech: "ultratech.png",
    vp: "victory_point.png",
    ships: "ship.png",
} as const;

export const RESOURCES = [
    "white",
    "green",
    "brown",
    "wsmall",
    "asmall",
    "yellow",
    "blue",
    "black",
    "wlarge",
    "alarge",
    "ultratech",
    "vp",
    "ships",
] as const;

export type ResourceType = typeof RESOURCES[number];

export const CLASSNAMES = {
    white: "small-cube",
    green: "small-cube",
    brown: "small-cube",
    wsmall: "small-cube",
    asmall: "small-cube",
    yellow: "large-cube",
    blue: "large-cube",
    black: "large-cube",
    wlarge: "large-cube",
    alarge: "large-cube",
    ultratech: "large-cube",
    vp: "victory-point",
    ships: "ship",
} as const;

export type Resource = [ResourceType, number];

export type ResourceCounts = [number, number, number, number, number, number, number, number, number, number, number, number, number];

export function get_donation_border_filename(resource_name: ResourceType): string {
    let filename;
    if (resource_name === "ultratech") {
        filename = "ultratech_donation_border.png";
    } else if (resource_name === "vp") {
        filename = "vp_donation_border.png";
    } else if (resource_name === "ships") {
        filename = "ship_donation_border.png";
    } else {
        filename = "cube_donation_border.png";
    }
    return "assets/icons/" + filename;
}

export function format_resources_text(res: Resource, donations: boolean): string {
    const names = {
        white: 'White',
        green: 'Green',
        brown: 'Brown',
        wsmall: 'Wild Small',
        asmall: 'Any Small',
        yellow: 'Yellow',
        blue: 'Blue',
        black: 'Black',
        wlarge: 'Wild Large',
        alarge: 'Any Large',
        ultratech: 'Ultratech',
        vp: 'VP',
        ships: 'Ships',
    };

    const [resource_name, count] = res;

    const donation_text = donations ? ' donation' : '';
    return `${count}${donation_text} ${names[resource_name]}`;
}


export function countsToTotals(counts: ResourceCounts): Resources {
    const totals = {} as Resources;
    for(let i = 0; i < RESOURCES.length; i++) {
        totals[RESOURCES[i]] = counts[i] ?? 0;
    }
    return totals;
}
