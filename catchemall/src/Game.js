import { Banner } from "./banner";
import  axios from "axios";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/' ;

const pokemonDisplayed=[];

async function callPokemon(i) {
     await axios.get(baseUrl+i).then(req=>{
        const pokemon = {
            name:req.data.name,
            no:req.data.id,
            types:req.data.types.map(type=>type.type.name)
        }
        pokemonDisplayed.push(pokemon)
    })
}
callPokemon(1);
console.log(pokemonDisplayed,'πινακας');
console.log(pokemonDisplayed[0]);

export function Game(){

    return(
    <>
        <Banner/>
        <>
        <h1>Poke-app</h1>
        </>
    </>
    )
}