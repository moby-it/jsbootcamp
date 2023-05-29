import { Card } from "./Card";
import { useEffect, useState } from "react"
import axios from "axios";


export function CardContainer({ pokemonArray }) {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    // console.log(pokemonArray);
    const [poke, setPoke] = useState([]);
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

    useEffect(() => {
        const numbers = generateNumbers();
        const newPoke = poke.slice();
        for (let i = 0; i < numbers.length; i++) {
            axios.get(baseUrl + numbers[i]).then(res => {
                const pokemon = {
                    name: res.data.name,
                    no: res.data.id,
                    types: res.data.types.map(type => type.type.name).reduce((accumulator, currentValue) => accumulator + `/${currentValue}`),
                    imgUrl: res.data.sprites.front_default
                }
                
                newPoke.push(pokemon);
               
            })
        }
         setPoke(newPoke);
         console.log(newPoke, 'newPoke')
    }, [])
    console.log(poke,'poke');

    const numbers= generateNumbers();
    return (
        <>

            <div className='pokelist'>
                <Card number={numbers[0]} />
                <Card number={numbers[1]} />
                <Card number={numbers[2]} />
                <Card number={numbers[3]} />
                <Card number={numbers[4]} />
            </div>

        </>
    )
}