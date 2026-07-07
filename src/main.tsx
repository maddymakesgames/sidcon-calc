import type { Faction, FactionsFile, RawCard, RawTechCard, ConverterDef, ConverterResources, CardDef } from './types'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][];

declare global {
    var all_cards: {[id: string]: Faction}

    interface ObjectConstructor {
        typedKeys<T>(obj: T): (keyof T)[];
        typedEntries<T>(o: T): Entries<T>;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Object.typedKeys = Object.keys as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Object.typedEntries = Object.entries as any;

globalThis.all_cards = {};

interface InProgressFaction {
    name: string,
    id: string,
    unique_cards: RawCard[] | {[key: string]: RawCard},
    starting_cards: RawCard[] | {[key: string]: RawCard},
    tech_cards: {[key: string]: RawCard | RawTechCard},
}

type InProgressTechCard = {
    name: string,
    upgrade_name: string,
    input?: ConverterResources,
    upgrade_input?: ConverterResources,
    output?: ConverterResources,
    upgrade_output?: ConverterResources
    converters?: ConverterDef[],
    starting?: boolean
}

async function getData() {
    const output = await fetch('./output.json');
    const temp: FactionsFile = await output.json();
    // normalize 'all cards' so that data structure is the same between
    // unique/starting cards and tech cards
    const fixedFactions: {[id: string]: Faction} = {};
    for (const [faction_id, faction_data] of Object.entries(temp)) {
        const data = faction_data as InProgressFaction;

        const unique_cards = ("unique_cards" in data) ? [...faction_data.unique_cards] : [];
        data.unique_cards = {};
        for (let i = 0; i < unique_cards.length; i++) {
            const unique_card_id = `${faction_id}$unique${i}`;
            data.unique_cards[unique_card_id] = unique_cards[i];
        }

        const starting_cards = ("starting_cards" in data) ? [...faction_data["starting_cards"]] : [];
        data.starting_cards = {};
        for (let i = 0; i < starting_cards.length; i++) {
            const starting_card_id = `${faction_id}$starting${i}`;
            data.starting_cards[starting_card_id] = starting_cards[i];
        }

        const transpose_keys = ["input", "output", "upgrade_input", "upgrade_output"] as const;
        const tech_cards = Object.entries(faction_data["tech_cards"]);
        data.tech_cards = {};
        for (const [id, tech_card] of tech_cards) {
            const card = tech_card as InProgressTechCard;
            const converter: Partial<ConverterDef> = {};
            for (const key of transpose_keys) {
                converter[key] = card[key];
                delete card[key];
            }
            card.converters = [converter as ConverterDef];
            data.tech_cards[`${faction_id}$${id}`] = card as CardDef;
        }

        fixedFactions[faction_id] = data as Faction;
    }
    // add properties to all converters
    for (const [faction_id, faction_data] of Object.entries(fixedFactions)) {
        console.log(faction_data);
        for (const key of ["tech_cards", "unique_cards", "starting_cards"] as const) {
            if (!(key in faction_data)) {
                continue;
            }
            for (const [id, card] of Object.entries(faction_data[key])) {
                card.upgraded = false;
                let era;
                if(key == "starting_cards") {
                    // starting cards are treated as era 0
                    era = 0;
                } else if(key == "unique_cards") {
                    // misc is treated as era 4 internally 
                    era = 4;
                } else {
                    // Tech cards get their normal era numbers
                    era = parseInt(id.split('$')[1].charAt(0));
                }

                card.era = era;
                card.owner = faction_id;
                card.id = id;

                for (const converter of card.converters) {
                    converter.running = false;
                    converter.owned = false;
                    converter.hidden = false;
                    converter.ee_tokens = 0;
                    converter.ttl = 0;
                }
            }
        }

    }

    globalThis.all_cards = fixedFactions;
}

(() => {
    getData().then(() => {
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <App />
          </StrictMode>
        )
    });
})();
