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
};

export type Faction = {
    name: string,
    id: string,
    starting_cards: {
        [id: string]: Card
    },
    unique_cards: {
        [id: string]: Card
    },
    tech_cards: {
        [id: string]: Card
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

export type Card = {
    name: string,
    upgrade_name: string,
    starting: boolean,
    era: number,
    owner: string,
    id: string,
    upgraded: boolean,
    converters: Converter[],
    upgrade_converters: Converter[],
    placement_converters: Converter[]
};

export type RawConverter = {
    input: ConverterResources,
    upgrade_input: ConverterResources,
    output: ConverterResources,
    upgrade_output: ConverterResources
};

export type Converter = {
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
