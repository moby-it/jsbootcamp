
import { useQuery } from 'react-query';
import { fetchPokemon } from './fetchPokemon';

function App() {
  const result = useQuery('pokemon', () => fetchPokemon());
  if (result.isFetching) return <h2>Loading...</h2>;
  return <h2>{JSON.stringify(result.data)}</h2>;
}

export default App;
