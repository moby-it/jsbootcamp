import { useState } from "react";

export function Card({ pokemon, updateFn }) {
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Catch me!')
    function tryToCatch(pokemon) {

        setTimeout(() => {
            const chance = Math.floor(Math.random() * 100);
            if (chance > 65) {
                updateFn(pokemon);
                setButtonText(() => 'Caught!')
            } else {
                setButtonText(() => 'Run away!')
            }
            setDisabled(true);
        }, 1500)
    }
    return (
        <>
            <div className="pokecard">
                <h1>{pokemon.name}</h1>
                <h2>#{pokemon.no}</h2>
                <img src={pokemon.imgUrl} />
                <h3>{pokemon.types[0]}{pokemon.types[1] && `/${pokemon.types[1]}`} </h3>
                <button disabled={disabled} className="btn btn-primary" onClick={() => tryToCatch(pokemon)}>{buttonText}</button>
            </div>
        </>
    )
}