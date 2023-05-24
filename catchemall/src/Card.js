import { useContext} from "react"
import { CaughtUpdate } from "./PokemonContextProvider"

export function Card({ pokemon }) {
 
    const catchPokemon= useContext(CaughtUpdate);
    return (
        <>
            <div className='pokecard'>
                <h1>{pokemon.name}</h1>
                <h2>{`#${pokemon.no}`}</h2>
                <h3>{pokemon.types[0]}{pokemon.types[1] && `/${pokemon.types[1]}`}</h3>
                <img src={pokemon.imageUrl} />
                <button className='btn btn-primary' onClick={catchPokemon}>catch</button>
            </div>
        </>)
}