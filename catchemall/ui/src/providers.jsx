import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { PokedexProvider } from './pokedexContext';
import { UserProvider } from './userContext';

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