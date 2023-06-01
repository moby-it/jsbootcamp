import { Card } from "./Card";
export function CardContainer({ displayedPokemon, updateFn }) {

    const cardContainer = displayedPokemon.map(pokemon => {
        return <Card key={pokemon.no} pokemon={pokemon} updateFn={() => updateFn(pokemon)} />
    }
    )
    return (
        <div className="pokelist">{cardContainer}</div>
    )
}