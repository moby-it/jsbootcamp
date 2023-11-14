import { createContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { decodeJwt } from '../utils/auth.helpers';

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {number} id
 * @property {number} caughtpokemon
 */

/**
 * @typedef {Object} UserContextValue
 * @property {Array<User>} users
 * @property {User} currentUser
 * @property {string} token
 * @property {boolean} isLoading
 * @property {(boolean)=>void} setIsLoading
 * @property {boolean} isLoading
 * @property {(string)=> void} setToken
 * @property {()=> void} logout
 */

/**
 * @type {React.Context<UserContextValue>}
 */
export const UserContext = createContext(null);
/**
 *
 * @returns {UserContextValue}
 */
function useUserConstext() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            setCurrentUser(null);
            setUsers([]);
            return;
        }
        setIsLoading(true);
        localStorage.setItem('token', token);
        const user = decodeJwt(token);
        setCurrentUser(user);
        setIsLoading(false);
    }, [token]);

    function logout() {
        localStorage.removeItem('token');
        setCurrentUser();
        setUsers([]);
        setToken();
        queryClient.clear();
    }
    return {
        users,
        currentUser,
        token,
        isLoading,
        setIsLoading,
        setToken,
        logout,
    };
}

export function UserProvider({ children }) {
    const r = useUserConstext();
    return <UserContext.Provider value={r}>{children}</UserContext.Provider>;
}
