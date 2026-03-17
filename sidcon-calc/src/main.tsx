window.global ||= window;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

global.all_cards = {};

async function getData() {
    let output = await fetch('./output.json');
    const temp = await output.json();
    // normalize 'all cards' so that data structure is the same between
    // unique/starting cards and tech cards
    global.all_cards = {};
    for (let [faction_id, faction_data] of Object.entries(temp)) {
        let data = faction_data;

        const unique_cards = ("unique_cards" in data) ? [...faction_data["unique_cards"]] : [];
        data["unique_cards"] = {};
        for (var i = 0; i < unique_cards.length; i++) {
            const unique_card_id = `unique${i}`;
            data["unique_cards"][unique_card_id] = unique_cards[i];
        }

        const starting_cards = ("starting_cards" in data) ? [...faction_data["starting_cards"]] : [];
        data["starting_cards"] = {};
        for (var i = 0; i < starting_cards.length; i++) {
            const starting_card_id = `starting${i}`;
            data["starting_cards"][starting_card_id] = starting_cards[i];
        }

        const transpose_keys = ["input", "output", "upgrade_input", "upgrade_output"];
        const tech_cards = Object.entries(faction_data["tech_cards"])
        // data["tech_cards"] = {};
        for (let [id, card] of tech_cards) {
            let converter = {};
            for (const key of transpose_keys) {
                converter[key] = card[key];
                delete card[key];
            }
            card["converters"] = [converter];
            data["tech_cards"][id] = card;
        }

        global.all_cards[faction_id] = data;
    }
    // add properties to all converters
    for (let [faction_id, faction_data] of Object.entries(global.all_cards)) {
        for (const key of ["tech_cards", "unique_cards", "starting_cards"]) {
            if (!(key in faction_data)) {
                continue;
            }
            for (let [id, card] of Object.entries(faction_data[key])) {
                card["upgraded"] = false;
                let era;
                if(key == "unique_cards" || key == "starting_cards") {
                    era = "starting";
                } else {
                    era = id.charAt(0);
                }

                card["era"] = era;
                card["owner"] = faction_id;

                for (const converter of card.converters) {
                    converter["running"] = false;
                    converter["owned"] = false;
                    converter["hidden"] = false;
                    converter["ee_tokens"] = 0;
                    converter["ttl"] = 0;
                }
            }
        }

    }
}

(() => {
    getData().then(() => {
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <App />
          </StrictMode>,
        )
    });
})();
