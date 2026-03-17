import CardDropdown from './CardDropdown.tsx';

function CardHolder({currFaction, ownedCards, runningConverters, setRunningConverters}) {

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
            <CardDropdown label="Starting" runningConverters={runningConverters} setRunningConverters={setRunningConverters} cards={cardEras[0]} />
            <CardDropdown label="Tier 1" runningConverters={runningConverters} setRunningConverters={setRunningConverters} cards={cardEras[1]} />
            <CardDropdown label="Tier 2" runningConverters={runningConverters} setRunningConverters={setRunningConverters} cards={cardEras[2]} />
            <CardDropdown label="Tier 3" runningConverters={runningConverters} setRunningConverters={setRunningConverters} cards={cardEras[3]} />
            <CardDropdown label="Misc" runningConverters={runningConverters} setRunningConverters={setRunningConverters} cards={cardEras[4]} />
        </div>
    </>;
}

export default CardHolder;
