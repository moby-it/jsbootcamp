import axios from 'axios'
import { useEffect, useState } from 'react'




export default function FindPokemon() {
    const [data, setData] = useState([])
  
    // function gotttaCatchit(){
    //     const num=Math.floor((Math.random()*10)+1)
    //     if(num>6)console.log(`You caught me Congrats!!!`)
    // }
    
    useEffect(() => {
        const fetchRandomPokemon = async () => {
          try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
            const { results } = response.data;
    
            const randomPokemonPromises = results.map(async (pokemon) => {
              const pokemonData = await axios.get(pokemon.url);
              return pokemonData.data;
            });
    
            const randomPokemon = await Promise.all(randomPokemonPromises);
            setData(randomPokemon);
          } catch (error) {
            console.error('Error fetching random Pokémon:', error);
          }
        };
    
        fetchRandomPokemon();
      }, []);
    return(
        <div>
      <h2>Random Pokémon</h2>
      <ul>
        {data && data.map((pokemon) => (
          <div key={pokemon.id}>
           <p>{pokemon.name}</p> 
           <p>{pokemon.id}</p> 
           {/* <p>{pokemon.types[0].type.name}{pokemon.types[1] && `/${pokemon.types[1].type.name}`}</p>  */}
           <img src={pokemon.sprites.front_default}/>
           <button>Catch me</button>
            </div>
          
        ))}
      </ul>
    </div>
    )
}