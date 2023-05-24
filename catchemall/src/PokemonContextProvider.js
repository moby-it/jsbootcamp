import axios from 'axios';
import { createContext, useMemo, useState } from 'react';

export const RandomPokemonContext = createContext();
export const Caught = createContext();
export const CaughtUpdate = createContext();

const pokedex = [];
const caught = Array(151);
async function findPokemon(i) {
    const request = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);

    return request;
}

for (let i = 1; i < 152; i++) {
    await findPokemon(i).then(request => {
        const pokemon = { name: request.data.name, imageUrl: request.data.sprites.front_default, no: request.data.id, types: [request.data.types[0].type.name] }
        if (request.data.types[1]) {
            pokemon.types = [...pokemon.types, request.data.types[1].type.name];

        }
        pokedex[i - 1] = pokemon;
    })
}


export function PokemonContext({ children }) {

    const randomPokemon = (function () {
        const toBeDisplayed = [];
        while (toBeDisplayed.length < 5) {
            let rand = Math.floor(Math.random() * pokedex.length);
            if (toBeDisplayed.indexOf(rand) === -1) {
                toBeDisplayed[toBeDisplayed.length] = rand;
            }
        }
        const newArr = [pokedex[toBeDisplayed[0]], pokedex[toBeDisplayed[1]], pokedex[toBeDisplayed[2]], pokedex[toBeDisplayed[3]], pokedex[toBeDisplayed[4]]];
        return newArr;
    })();
    function catchPokemon(e) {
        const target = e.target.parentElement.children;
        const pokemon = { name: target[0].innerText, no: target[1].innerText, imageUrl: target[3].src };
        const chance = Math.floor(Math.random() * 100);
        if (chance > 40) {

            console.log(`Congrats! ${pokemon.name} was caught!`)
            caught[pokemon.no]=pokemon;
            console.log(pokemonCaught);

        } else {
            console.log(`Shoo! ${pokemon.name} got away`);
        }
    }
    const pokemonCaught=useMemo(()=>{
        return caught;
    })
    

    return (
        <>
            <RandomPokemonContext.Provider value={randomPokemon}>
                <CaughtUpdate.Provider value={catchPokemon}>
                    <Caught.Provider value={pokemonCaught}>
                        {children}
                    </Caught.Provider>
                </CaughtUpdate.Provider>
            </RandomPokemonContext.Provider>
        </>
    )
}