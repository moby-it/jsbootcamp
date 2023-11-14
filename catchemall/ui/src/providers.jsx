import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './context/userContext';

export function AppProviders({ children, defaultOptions }) {
    if (!defaultOptions) defaultOptions = {};
    const queryClient = new QueryClient({ ...defaultOptions });

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>{children}</UserProvider>
        </QueryClientProvider>
    );
}
