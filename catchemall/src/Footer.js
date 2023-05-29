import { PokemonCaught } from "./PokemonCaught";

export function Footer({pokemonArray}) {
    return (
        <>
            <div className='footer'>
                <PokemonCaught pokemonArray={pokemonArray} />
            </div>
        </>
    )
}