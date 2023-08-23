

import {
  createBrowserRouter, RouterProvider, Navigate
} from "react-router-dom";
import { DailyPokemon } from './pages/DailyPokemon';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ErrorPage } from './pages/ErrorPage';
import { useContext } from "react";
import { UserContext } from './userContext';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <DailyPokemon />
    </ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
