import { Banner } from "./banner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

function generateNumbers() {
    const numbers = [];
    while (numbers.length < 5) {
        const number = Math.floor(Math.random() * 151 + 1)
        if (numbers.indexOf(number) === -1) {
            numbers.push(number);
        }
    }
    return numbers;
};

export function Game() {
    const postQuery = useQuery({
        queryKey: ['pokemon'],
        queryFn: () => {
            const pokemonDisplayed = [];
            const randomNumbers = generateNumbers();
            randomNumbers.map(number => {
                axios.get(baseUrl + number).then(res => {
                    const pokemon = {
                        name: res.data.name,
                        no: res.data.id,
                        types: res.data.types.map(type => type.type.name),
                        imageUrl: res.data.sprites.front_default
                    }
                    pokemonDisplayed.push(pokemon);
                })

            })
            return pokemonDisplayed
        }
    })
    if (postQuery.isLoading) {
        return (
            <>
                <Banner />
                <h1>loading!</h1>
            </>
        )
    }
    if (postQuery.isSuccess) {
        console.log(postQuery.data)
        return (
            <>
                <Banner />
                <h1>loaded</h1>
            </>
        )
    }

}