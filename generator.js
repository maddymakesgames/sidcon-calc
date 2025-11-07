let fs = require("fs");

let file = fs.readFileSync("factions.json");
let data = JSON.parse(file);

let card_data = [];


/* 
 * This is used to parse the factions.json file into something usable by the site
 * factions.json should be the only file manually edited.
 * 
 * Converters in factions.json use a condensed format, with colors being as follows:
 * w: white
 * g: green
 * b: brown
 * x: wild small
 * a: any small (the wild eni et converter inputs)
 * Y: yellow
 * C: blue
 * K: black
 * X: wild large
 * A: any large
 * U: ultratech
 * s: ship
 * V: VP
 *
 * No planet eating is supported rn but if that becomes a thing its:
 * p: planet
 * d: desert planet
 * i: ice planet
 * j: jungle planet
 * o: ocean planet
 *
 * Anything after 'D' is treated as a donation.
 * 
 * Converters are split into the base output and the upgraded delta
 * anything after '-' in a delta is removed from the output
 *
 * I don't think its relavent to the vanilla game BUT donations take precedent over subtractions.
 * So 1w-1sD1Y-1g would be how to write a converter that upgrades to replace an owned ship
 * with a white and a dontation green with a dontation yellow
 *
 * */



function parse_resources(str) {
    let count = 0;
    let donations = false;
    let negative = 1;
    let output = {};
    let curr = {}; 
    for(let i = 0; i < str.length; i++) {
        let c = str[i];
        if(c >= '0' && c <= '9') {
            count = negative * parseInt(c);
        } else {
            switch(c) {
                case 'w':
                    curr.white = count;
                    break;
                case 'g':
                    curr.green = count;
                    break;
                case 'b':
                    curr.brown = count;
                    break;
                case 'Y':
                    curr.yellow = count;
                    break;
                case 'C':
                    curr.blue = count;
                    break;
                case 'K':
                    curr.black = count;
                    break;
                case 'U':
                    curr.ultratech = count;
                    break;
                case 'V':
                    curr.vp = count;
                    break;
                case 's':
                    curr.ships = count;
                    break;
                case 'D':
                    donations = true;
                    negative = 1;
                    output.owned = curr;
                    curr = {};
                    break;
                case '-':
                    negative = -1;
                    break;
            }
        }
    }
    
    if(donations) {
        output.donations = curr;
    } else {
        output.donations = {};
        output.owned = curr;
    }

    return output;
}

function add_inner_res(res1, res2) {
    return {
        white: res1.white ? res1.white : 0 + res2.white ? res2.white : 0,
        brown: res1.brown ? res1.brown : 0 + res2.brown ? res2.brown : 0,
        green: res1.green ? res1.green : 0 + res2.green ? res2.green : 0,
        wsmall: res1.wsmall ? res1.wsmall : 0 + res2.wsmall ? res2.wsmall : 0,
        black: res1.black ? res1.black : 0 + res2.black ? res2.black : 0,
        yellow: res1.yellow ? res1.yellow : 0 + res2.yellow ? res2.yellow : 0,
        blue: res1.blue ? res1.blue : 0 + res2.blue ? res2.blue : 0,
        wlarge: res1.wlarge ? res1.wlarge : 0 + res2.wlarge ? res2.wlarge : 0,
        ultratech: res1.ultratech ? res1.ultratech : 0 + res2.ultratech ? res2.ultratech : 0,
        ships: res1.ships ? res1.ships : 0 + res2.ships ? res2.ships : 0,
        vp: res1.vp ? res1.vp : 0 + res2.vp ? res2.vp : 0
    };
}

function add_resources(res1, res2) {
    let output = {
        owned: add_inner_res(res1.owned, res2.owned),
        donations: add_inner_res(res1.donations, res2.donations)
    };

    for(let [k, v] of Object.entries(output.owned)) {
        if(v == 0) {
            delete output.owned[k];
        }
    }

    for(let [k, v] of Object.entries(output.donations)) {
        if(v == 0) {
            delete output.donations[k];
        }
    }

    return output;
}

function resources_value(res) {
    let smalls = res.white + res.brown + res.green + res.wsmall + res.ships;
    let larges = res.blue + res.black + res.yellow + res.wlarge;
    return smalls * 2 + larges * 3 + res.ultratech * 6 + res.vp * 12;
}


for(let card of data["tech-cards"]) {
    let input = parse_resources(card[2]);
    card_data.push({
        name: card[0],
        upgrade_name: card[1],
        input: input,
        upgrade_input: input
    });
}

let factions = {};

for(let faction of data.factions) {
    factions[faction.id] = faction;
}

for(let faction of Object.keys(data["faction-tech-cards"])) {
    let faction_data = data["faction-tech-cards"][faction];
    let faction_cards = [];
    for(let i = 0; i < card_data.length; i++) {
        let card = card_data[i];
        let output = parse_resources(faction_data[i][0]);
        let upgrade_delta = parse_resources(faction_data[i][1]);
        let upgrade_output = add_resources(output, upgrade_delta);
        card.output = output;
        card.upgrade_output = upgrade_output;

        if(i < 7 && faction == "unity") {
            card.upgrade_input
        }
        faction_cards.push(card);
    }
    factions[`base-${faction}`].tech_cards = faction_cards;
    factions[`alt-${faction}`].tech_cards = faction_cards;
}

fs.writeFileSync("output.json", JSON.stringify(factions, null, 4));
