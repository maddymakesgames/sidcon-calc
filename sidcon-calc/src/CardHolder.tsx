import CardDropdown from './CardDropdown.tsx';

function CardHolder({currFaction, ownedCards, setRunningConverters}) {

    let cardEras = [[], [], [], [], []];
    for(let [id, card] of Object.entries(ownedCards)) {
        if(card.owner != currFaction) {
            cardEras[3].push([id, card]);
        } else {
            if(card.era == "starting") {
                cardEras[0].push([id, card]);
            } else {
                cardEras[parseInt(card.era)].push([id, card]);
            }
        }
    }

    return <>
        <div className="container px-4" id="card-dropdown-container">
            <CardDropdown label="Starting" setRunningConverters={setRunningConverters} cards={cardEras[0]} />
            <CardDropdown label="Tier 1" setRunningConverters={setRunningConverters} cards={cardEras[1]} />
            <CardDropdown label="Tier 2" setRunningConverters={setRunningConverters} cards={cardEras[2]} />
            <CardDropdown label="Tier 3" setRunningConverters={setRunningConverters} cards={cardEras[3]} />
            <CardDropdown label="Misc" setRunningConverters={setRunningConverters} cards={cardEras[4]} />
        </div>
    </>;
}

export default CardHolder;
