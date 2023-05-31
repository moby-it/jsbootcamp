import { Card } from "./Card";
export function CardContainer({ displayedPokemon }) {
   
    const cardContainer = displayedPokemon.map(pokemon => {
       return <Card key={pokemon.no} pokemon={pokemon} />
    }
    )
    return(
    <div className="pokelist">{cardContainer}</div>
    )
}