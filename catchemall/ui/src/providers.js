import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { PokedexProvider } from './pokedexContext';
import { UserProvider } from './userContext';
export function AppProviders({ children }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

  return <QueryClientProvider client={queryClient}>
    <UserProvider>
      <PokedexProvider>
        {children}
      </PokedexProvider >
    </UserProvider>
  </QueryClientProvider>;
}