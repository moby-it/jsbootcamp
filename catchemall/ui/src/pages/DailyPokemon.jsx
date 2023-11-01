
import { CaughtPokemonPokeCard } from '../components/CatchPokemonCard';
import { CaughtList } from '../components/CaughtList';
import { transform } from "../utils/transformPokemon";
import { useDailyPokemon } from '../hooks';

export function DailyPokemon() {
  const dailyPokemonQuery = useDailyPokemon();
  return <>
    <div className='pokecard-list'>
      {!dailyPokemonQuery.isSuccess ? [] : dailyPokemonQuery.data.map(transform).map((pokemon, index) => <CaughtPokemonPokeCard key={`${pokemon.id}_${index}_${pokemon.caught}`} {...pokemon} />)}
    </div>
    <CaughtList />
  </>;
}