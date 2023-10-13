import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { PokemonProvider } from './context/pokemonContext';
import { UserProvider } from './context/userContext';

export function AppProviders({ children }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, enabled: false } } });

  return <QueryClientProvider client={queryClient}>
    <PokemonProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </PokemonProvider >
  </QueryClientProvider>;
}