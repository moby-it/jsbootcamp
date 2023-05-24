
import { useEffect, useState } from 'react';
import { fetchPokemon } from './fetchPokemon';
let init = true;
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (init) {
      init = false;
      fetchPokemon().then(pokelist => {
        console.log(pokelist);
        setLoading(false);
      });
    }
  }, []);
  if (loading) return <h2>Loading...</h2>;
  return <h2> Pokemon fetched</h2>;
}

export default App;
