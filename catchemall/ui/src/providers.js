import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { PokedexProvider } from './pokedexContext';
export function AppProviders({ children }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

  return <QueryClientProvider client={queryClient}>
    <PokedexProvider>
      {children}
    </PokedexProvider >
  </QueryClientProvider>;
}