import type { ConverterResources, Resources } from "./types";

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

export function isConverterResourcesEmpty(resources: ConverterResources) {
    return isResourcesEmpty(resources.owned) && isResourcesEmpty(resources.donations);
}

export function isResourcesEmpty(resources: Resources): boolean {
    return !Object.values(resources).some(v => v != 0);
}

export function calculateValue(total: Resources): number {
    const smalls = total.white + total.brown + total.green + total.wsmall + total.ships;
    const larges = total.black + total.blue + total.yellow + total.wlarge;
    const ultras = total.ultratech + total.vp;

    return smalls + 1.5 * larges + 3 * ultras;
}

export function calculateScore(total: Resources): { vp: number, partial: number } {
    const value = 3 * total.vp + calculateValue(total);
    let partials = value * 2;

    const vp = Math.floor(partials / 12);
    partials = partials % 12;

    return {
        vp: vp,
        partial: partials
    };
}

export function totalCubes(t: ConverterResources): Resources {
    return RESOURCES.reduce((total, resourceName) => {
        const owned = t.owned?.[resourceName] ?? 0;
        const donations = t.donations?.[resourceName] ?? 0;
        total[resourceName] = owned + donations;
        return total;
    }, {} as Resources);
}

export function emptyTotals(): ConverterResources {
    const owned = RESOURCES.reduce((owned_totals, resource_name) => {
        owned_totals[resource_name] = 0;
        return owned_totals;
    }, {} as Resources);
    const donation = RESOURCES.reduce((donation_totals, resource_name) => {
        donation_totals[resource_name] = 0;
        return donation_totals;
    }, {} as Resources);
    return {
        owned: owned,
        donations: donation,
    };

}

export function addTotals(t1: ConverterResources, t2: ConverterResources): ConverterResources {
    const owned = RESOURCES.reduce((ownedTotals, resourceName) => {
        const t1Resource = t1["owned"]?.[resourceName] ?? 0;
        const t2Resource = t2["owned"]?.[resourceName] ?? 0;
        ownedTotals[resourceName] = t1Resource + t2Resource;
        return ownedTotals;
    }, {} as Resources);
    const donation = RESOURCES.reduce((donationTotals, resourceName) => {
        const t1Resource = t1["donations"]?.[resourceName] ?? 0;
        const t2Resource = t2["donations"]?.[resourceName] ?? 0;
        donationTotals[resourceName] = t1Resource + t2Resource;
        return donationTotals;
    }, {} as Resources);
    return {
        owned: owned,
        donations: donation,
    };
}

export function subTotals(t1: ConverterResources, t2: ConverterResources): ConverterResources {
    const owned = RESOURCES.reduce((ownedTotals, resourceName) => {
        const t1Resource = t1["owned"][resourceName] ?? 0;
        const t2Resource = t2["owned"][resourceName] ?? 0;
        ownedTotals[resourceName] = t1Resource - t2Resource;
        return ownedTotals;
    }, {} as Resources);
    const donation = RESOURCES.reduce((donationTotals, resourceName) => {
        const t1Resource = t1["donations"]?.[resourceName] ?? 0;
        const t2Resource = t2["donations"]?.[resourceName] ?? 0;
        donationTotals[resourceName] = t1Resource - t2Resource;
        return donationTotals;
    }, {} as Resources);
    return {
        owned: owned,
        donations: donation,
    };
}
