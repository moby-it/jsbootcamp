
import { useContext } from 'react';
import { CaughtPokemonPokeCard } from '../components/CatchPokemonCard';
import { CaughtList } from '../components/CaughtList';
import { PokemonContext } from '../context/pokemonContext';

export function DailyPokemon() {
  const { dailyPokemonQuery, dailyPokemon } = useContext(PokemonContext);
  if (dailyPokemonQuery.isFetching) return <h2>Loading...</h2>;
  if (dailyPokemonQuery.error) return <h2>Error</h2>;
  return <>
    <div className='pokecard-list'>
      {dailyPokemon.map((pokemon, index) => <CaughtPokemonPokeCard key={`${pokemon.id}_${index}`} {...pokemon} />)}
    </div>
    <CaughtList />
  </>;
}