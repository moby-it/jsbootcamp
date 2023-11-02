
import { CaughtPokemonPokeCard } from '../components/CatchPokemonCard';
import { CaughtList } from '../components/CaughtList';
import { transform } from "../utils/transformPokemon";
import { useDailyPokemon } from '../hooks';
import { useEffect } from 'react';

export function DailyPokemon() {

  const dailyPokemonQuery = useDailyPokemon();
  
  // at 12AM daily pokemon rotates for every user so we need to refetch
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const isMidnight = Math.abs(midnight.getTime() - now.getTime()) < 1000;
      if (isMidnight)
        dailyPokemonQuery.refetch();
      return () => clearInterval(interval);
    }, 1000);
  }, [dailyPokemonQuery]);

  return <>
    <div className='pokecard-list'>
      {!dailyPokemonQuery.isSuccess ? [] : dailyPokemonQuery.data.map(transform).map((pokemon, index) => <CaughtPokemonPokeCard key={`${pokemon.id}_${index}_${pokemon.caught}`} {...pokemon} />)}
    </div>
    <CaughtList />
  </>;
}