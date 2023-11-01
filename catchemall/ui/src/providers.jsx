import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { UserProvider } from './context/userContext';

export function AppProviders({ children }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, } } });

  return <QueryClientProvider client={queryClient}>
    <UserProvider>
      {children}
    </UserProvider>
  </QueryClientProvider>;
}