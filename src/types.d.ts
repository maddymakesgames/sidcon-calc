export type FactionsFile = {
    [id: string]: RawFaction
}

export type RawFaction = {
    name: string,
    id: string,
    starting_cards: RawCard[],
    unique_cards: RawCard[],
    tech_cards: {
        [id: string]: RawTechCard
    }
    distributed_cards?: {
        [faction: string]: RawCard,
    }
};

export type Faction = {
    name: string,
    id: string,
    starting_cards: {
        [id: string]: CardDef
    },
    unique_cards: {
        [id: string]: CardDef
    },
    tech_cards: {
        [id: string]: CardDef
    },
    distributed_cards: {
        [id: string]: CardDef
    }
}

export type RawCard = {
    name: string,
    upgrade_name: string,
    starting: boolean,
    converters: RawConverter[],
    upgrade_converters?: RawConverter[],
    placement_converters?: RawConverter[]
};

export type RawTechCard = {
    name: string,
    upgrade_name: string,
    input: ConverterResources,
    upgrade_input: ConverterResources,
    output: ConverterResources,
    upgrade_output: ConverterResources
}

export type CardDef = {
    name: string,
    upgrade_name: string,
    starting: boolean,
    era: number,
    owner: string,
    id: string,
    upgraded: boolean,
    converters: ConverterDef[],
    upgrade_converters: ConverterDef[],
    placement_converters: ConverterDef[]
};

export type RawConverter = {
    input: ConverterResources,
    upgrade_input: ConverterResources,
    output: ConverterResources,
    upgrade_output: ConverterResources
};

export type ConverterDef = {
    input: ConverterResources,
    upgrade_input: ConverterResources,
    output: ConverterResources,
    upgrade_output: ConverterResources,
    running: boolean,
    owned: boolean,
    hidden: boolean,
    ee_tokens: number,
    ttl: number
}

export type ConverterResources = {
    donations: Resources,
    owned: Resources
};

export type Resources = {
    white: number,
    green: number,
    brown: number,
    wsmall: number,
    asmall: number,
    yellow: number,
    blue: number,
    black: number,
    wlarge: number,
    alarge: number,
    ultratech: number,
    vp: number,
    ships: number,
};
