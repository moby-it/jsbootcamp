import { Caught } from "./PokemonContextProvider";
import { useContext, useEffect } from "react";

export function PokemonCaught() {
    const caughtArray = useContext(Caught);
    useEffect(()=>{console.log(caughtArray)});
    // const PokemonCaught = caughtArray.map(pokemon=>{
    //     if (!pokemon) {
    //         return
    //     } else{
    //         return(
    //             <div className='pokecard'>
    //             <h1>{pokemon.name}</h1>
    //             <h2>{`#${pokemon.no}`}</h2>
    //             <img src={pokemon.imageUrl} />
    //         </div>
    //         )
    //     }
    // })

    return (
        <>
        </>
    )
}