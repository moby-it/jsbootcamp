
import { useQuery } from 'react-query';
import PokeCard from './components/pokeCard';
import { fetchPokemon } from './fetchPokemon';

function App() {
  console.log("re run app component");
  const result = useQuery('pokemon', () => fetchPokemon());
  if (result.isFetching) return <h2>Loading...</h2>;
  if (result.error) return <h2>Error</h2>;
  return <>
    <h1>PokeList</h1>
    <div className='pokecard-list'>
      {result.data.map(pokemon => <PokeCard key={pokemon.id} {...pokemon} />)}
    </div>
  </>;
}

export default App;
