import { Banner } from "./banner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CardContainer } from "./CardContainer";
import { Footer } from './Footer'
import { HorizontalLine } from './HorizontalLine'
import { useState } from "react";
import { useEffect } from "react";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

function generateUrls() {
    const numbers = [];
    while (numbers.length < 5) {
        const number = Math.floor(Math.random() * 151 + 1)
        if (numbers.indexOf(number) === -1) {
            numbers.push(number);
        }
    }
    const urls = numbers.map(number => baseUrl + number)
    return urls
};

const fetchData = async (url) => {
    const response = await axios.get(url)
    return response.data;
}
export function Game() {
    const [pokemonCaught, setPokemonCaught] = useState([]);

    useEffect(() => {
        const storedPokemon = JSON.parse(localStorage.getItem('storedPokemon'));

        setPokemonCaught(storedPokemon);
    }, [])


    useEffect(() => {
        if (pokemonCaught.length>0) {
            localStorage.setItem('storedPokemon', JSON.stringify(pokemonCaught));
        }
      
    }, [pokemonCaught]);
    function sortPokemon(a,b){
        return a.no - b.no;
    }


    function updatePokemonCaught(pokemon) {
        const newArray = [...pokemonCaught,pokemon];
        newArray.sort(sortPokemon);
        setPokemonCaught(newArray);
    }
    const urls = generateUrls();
    const postQuery = useQuery({
        queryKey: ['pokemon'],
        queryFn: async () => {
            const promises = urls.map(url => fetchData(url));
            const pokeData = await Promise.all(promises);
            return pokeData;
        }
    })
    if (postQuery.isLoading) {
        return (
            <>
                <Banner />
                <h1>loading</h1>
            </>
        )
    }
    if (postQuery.isFetched) {
        const displayedPokemon = postQuery.data.map(data => {
            return {
                name: data.name,
                no: data.id,
                types: data.types.map(type => type.type.name),
                imgUrl: data.sprites.front_default
            }
        })

        return (
            <>
                <Banner />
                <CardContainer displayedPokemon={displayedPokemon} updateFn={updatePokemonCaught} />
                <HorizontalLine />
                <Footer pokemonArray={pokemonCaught} />
            </>
        )

    }



    //     }

}