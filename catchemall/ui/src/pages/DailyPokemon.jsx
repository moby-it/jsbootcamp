
import { useQuery } from 'react-query';
import { CaughtList } from '../components/CaughtList';
import PokeCard from '../components/PokeCard';
import { fetchPokemon } from '../utils/fetchPokemon';

export function DailyPokemon() {
  const result = useQuery('pokemon', () => fetchPokemon(), { enabled: true });
  if (result.isFetching) return <h2>Loading...</h2>;
  if (result.error) return <h2>Error</h2>;
  return <>
    <div className='pokecard-list'>
      {result.data.map(pokemon => <PokeCard key={pokemon.id} {...pokemon} />)}
    </div>
    <CaughtList />
  </>;
}