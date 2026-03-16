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
};

export const RESOURCES = [
    "white",
    "green",
    "brown",
    "wsmall",
    "yellow",
    "blue",
    "black",
    "wlarge",
    "ultratech",
    "vp",
    "ships",
];

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
};

export function get_donation_border_filename(resource_name) {
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

export function format_resources_text(res, donations) {
    let output = '';
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

    let [resource_name, count] = res;

    let donation_text = donations ? ' donation' : '';
    return `${count}${donation_text} ${names[resource_name]}`;
}

export function resourceImage(resource) {
    let icon = `assets/icons/${FILENAMES[resource]}`;
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



export function resource_icon(res, is_donation) {
    let [resource_name, count] = res
    const classname = CLASSNAMES[resource_name];
    const filename = "assets/icons/" + FILENAMES[resource_name];
    const count_display = count > 1 ? count : "";
    const donation_border = is_donation ? <img className={"centered donation " + classname} src={get_donation_border_filename(resource_name)} /> : <></>;
    return <div className={"resource " + classname}>
                {donation_border}
                <img className={"centered " + classname} src={filename} alt={format_resources_text(res)} />
                <span className="centered">{count_display}</span>
            </div>; // whitespace here must be missing for correct arrow formatting
}

export function countsToTotals(counts) {
    let totals = {};
    for(let i = 0; i < RESOURCES.length; i++) {
        totals[RESOURCES[i]] = counts[i] ?? 0;
    }
    return totals;
}
