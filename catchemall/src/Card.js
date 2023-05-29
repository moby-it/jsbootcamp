import { useEffect, useState } from "react"
import axios from "axios";


export function Card({ number }) {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function generateNumbers() {
        const randomNumbers = [];
        while (randomNumbers.length < 5) {
            const newNumber = Math.floor(Math.random() * 151+ 1);
            if (randomNumbers.indexOf(newNumber) === -1) {
                randomNumbers.push(newNumber);
            }
        }
        return randomNumbers;
    }

    const [poke, setPoke] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + number).then(res => {
            const pokemon = {
                name: res.data.name,
                no: res.data.id,
                types:res.data.types.map(type => type.type.name).reduce((accumulator, currentValue) => accumulator + `/${currentValue}`),
                imgUrl: res.data.sprites.front_default
            }
            setPoke(() => pokemon);
        })
    }, [])
  


    return (
        <>
            <div className="pokecard">'
                <h1>{poke.name}</h1>
                <h2>{`#${poke.no}`}</h2>
                <h3>{poke.types}</h3>
         
                <img src={poke.imgUrl}></img>
                <button>Catch me!</button>
            </div>
        </>)
}