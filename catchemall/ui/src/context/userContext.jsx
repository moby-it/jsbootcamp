import { createContext, useContext, useEffect, useState } from "react";
import { useDailyPokemon, useFetchUsers, usePokemonCaught } from "../hooks";
import { decodeJwt } from "../utils/auth.helpers";
import { PokemonContext, transform } from "./pokemonContext";

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
function useUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const { setPokemonCaught, setDailyPokemon } = useContext(PokemonContext);
  const pokemonCaughtQuery = usePokemonCaught();
  const dailyPokemonQuery = useDailyPokemon();
  const fetchUsersQuery = useFetchUsers();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setCurrentUser(null);
      setUsers([]);
      return;
    }
    setIsLoading(true);
    localStorage.setItem('token', token);
    Promise.all([
      pokemonCaughtQuery.refetch(),
      fetchUsersQuery.refetch(),
      dailyPokemonQuery.refetch()
    ]).then(([pokemonCaught, users, dailyPokemon]) => {
      const user = decodeJwt(token);
      setPokemonCaught(pokemonCaught.data.map(transform));
      setDailyPokemon(dailyPokemon.data.map(transform));
      setCurrentUser(user);
      setUsers(users.data);
      setIsLoading(false);
    });
  }, [token]);

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser();
    setUsers([]);
    setToken();
  }
  return {
    users,
    currentUser,
    token,
    isLoading,
    setIsLoading,
    setToken,
    logout
  };
}


export function UserProvider({ children }) {
  const r = useUsers();
  return <UserContext.Provider value={r}>
    {children}
  </UserContext.Provider>;
}