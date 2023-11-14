import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';
import { DailyPokemon } from './pages/DailyPokemon';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ErrorPage } from './pages/ErrorPage';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import { tokenIsValid } from './utils/auth.helpers';
import { Header } from './components/Header';
import { User } from './pages/User';
import { Users } from './pages/Users';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <DailyPokemon />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/user',
        element: (
            <ProtectedRoute>
                <User />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/users',
        element: (
            <ProtectedRoute>
                <Users />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/user/:id',
        element: (
            <ProtectedRoute>
                <User />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/register',
        element: (
            <UnauthenticatedRoute>
                <Register />,
            </UnauthenticatedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: (
            <UnauthenticatedRoute>
                <Login />,
            </UnauthenticatedRoute>
        ),
        errorElement: <ErrorPage />,
    },
]);

function ProtectedRoute({ children }) {
    const { currentUser, isLoading } = useContext(UserContext);
    if (isLoading) return <span>Loading...</span>;
    if (!currentUser) return <Navigate to="/login" replace />;
    return (
        <>
            <Header />
            {children}
        </>
    );
}
function UnauthenticatedRoute({ children }) {
    const { setToken, isLoading, setIsLoading, currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!currentUser && !isLoading && token && tokenIsValid(token)) {
            setIsLoading(true);
            setToken(token);
        }
        if (currentUser) navigate('/');
    }, [currentUser, isLoading, navigate, setIsLoading, setToken]);
    return children;
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
