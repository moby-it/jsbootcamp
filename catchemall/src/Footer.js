import { CaughtCard } from "./CaughtCard"

export function Footer({ pokemonArray }) {
    console.log(pokemonArray)
    const pokeCards = pokemonArray.map(pokemon => {
        return <CaughtCard key={pokemon.no} pokemon={pokemon} />
    })
    return (
        <>

            <div className='pokelistCaught footer'>{pokeCards}</div>
        </>
    )
}