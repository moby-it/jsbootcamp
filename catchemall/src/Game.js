import { CardContainer } from "./CardContainer";
import { Banner } from "./banner";
import { HorizontalLine } from "./HorizontalLine";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
function generateNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length < 5) {
        const newNumber = Math.floor(Math.random() * 151 + 1);
        if (randomNumbers.indexOf(newNumber) === -1) {
            randomNumbers.push(newNumber);
        }
    }
    return randomNumbers;
}

export async function getPokemon() {
    const pokemonUrls = [];
    const numbers = generateNumbers();
    for (let i = 0; i < 5; i++) {
        pokemonUrls.push(`${baseUrl}${numbers[i]}`);
    }
    return await Promise.all(pokemonUrls.map(async (url) => fetch(url).then(r => r.json().then(pokemon => {
        return {
            name: pokemon.name,
            no: pokemon.id,
            types: pokemon.types.map(type => type.type.name),
            imgUrl: pokemon.sprites.front_default
        }
    }))))
}




const pokemonArray = await getPokemon();



export function Game() {
    const [pokemonCaught, setPokemonCaught] = useState([]);
    useEffect(() => {
        axios.get(baseUrl + 1).then(res => {
            const pokemon = {
                name: res.data.name,
                no: res.data.id,
                types: res.data.types.map(type => type.type.name),
                imgUrl: res.data.sprites.front_default
            }
            setPokemonCaught(() => pokemon)
        })
    }, [])


    return (
        <>
            <Banner />
            <CardContainer pokemonArray={pokemonArray} />
            <HorizontalLine />
            <Footer />
        </>
    )
}