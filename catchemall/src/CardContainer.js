import { Card } from "./Card";
import { RandomPokemonContext } from "./PokemonContextProvider";
import { useContext, useMemo } from "react";

export function CardContainer() {
    const context = useContext(RandomPokemonContext);
    const pokemon = useMemo(()=>{
        return context
    },[]);
    return (
        <>
      
                <div className='pokelist'>
                    <Card pokemon={pokemon[0]} />
                    <Card pokemon={pokemon[1]} />
                    <Card pokemon={pokemon[2]} />
                    <Card pokemon={pokemon[3]} />
                    <Card pokemon={pokemon[4]} />
                </div>
      
        </>
    )
}