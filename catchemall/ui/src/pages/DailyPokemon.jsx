
import { useQuery } from 'react-query';
import PokeCard from '../components/PokeCard';
import { fetchPokemon } from '../utils/fetchPokemon';
import { CaughtList } from '../components/CaughtList';
import { LogOut } from 'iconoir-react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
export function DailyPokemon() {
  const result = useQuery('pokemon', () => fetchPokemon(), { enabled: true });
  const { logout } = useContext(UserContext);
  if (result.isFetching) return <h2>Loading...</h2>;
  if (result.error) return <h2>Error</h2>;
  return <>
    <div className="w-100 flex justify-between align-center">
      <h1>PokeList</h1>
      <LogOut height={40} width={40} className="cursor-pointer" onClick={logout} />
    </div>
    <div className='pokecard-list'>
      {result.data.map(pokemon => <PokeCard key={pokemon.id} {...pokemon} />)}
    </div>
    <CaughtList />
  </>;
}