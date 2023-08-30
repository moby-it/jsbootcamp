import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { PokedexProvider } from './context/pokedexContext';
import { UserProvider } from './context/userContext';

export function AppProviders({ children }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, enabled: false } } });

  return <QueryClientProvider client={queryClient}>
    <PokedexProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </PokedexProvider >
  </QueryClientProvider>;
}