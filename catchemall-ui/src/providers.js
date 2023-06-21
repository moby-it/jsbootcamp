import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { PokedexProvider } from './pokedexContext';
export function AppProviders({ children }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

  return <PokedexProvider>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </PokedexProvider>;
}