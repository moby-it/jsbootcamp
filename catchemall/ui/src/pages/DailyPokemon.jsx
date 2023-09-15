
import { useContext } from 'react';
import { CaughtList } from '../components/CaughtList';
import PokeCard from '../components/PokeCard';
import { PokedexContext } from '../context/pokedexContext';

export function DailyPokemon() {
  const { dailyPokemonQuery, dailyPokemon } = useContext(PokedexContext);
  if (dailyPokemonQuery.isFetching) return <h2>Loading...</h2>;
  if (dailyPokemonQuery.error) return <h2>Error</h2>;
  return <>
    <div className='pokecard-list'>
      {dailyPokemon.map(pokemon => <PokeCard key={pokemon.id} {...pokemon} />)}
    </div>
    <CaughtList />
  </>;
}