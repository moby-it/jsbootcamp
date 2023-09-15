import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { decodeJwt, fetchWithAuth } from "../utils/auth.helpers";
import { apiUrl } from "../utils/config";
import { PokedexContext } from "./pokedexContext";
/**
 * @typedef {Object} User
 * @property {string} username
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
 * @property {(username,password)=> Promise<boolean>} register
 * @property {(username,password)=> Promise<boolean>} login
 * @property {()=> void} logout
 * 
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
  const { fetchPokemonCaught, setPokemonCaught, dailyPokemonQuery, setDailyPokemon } = useContext(PokedexContext);
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
      fetchPokemonCaught(),
      fetchUsersQuery.refetch(),
      dailyPokemonQuery.refetch()
    ]).then(([pokemonCaught, users, dailyPokemon]) => {
      const user = decodeJwt(token);
      setPokemonCaught(pokemonCaught.data);
      setDailyPokemon(dailyPokemon.data.map(p => ({
        name: p.name, id: p.pokedex_id, types: p.types, imageUrl: p.image_url, caught: p.caught
      })));
      setCurrentUser(user);
      setUsers(users.data);
      setIsLoading(false);
    });
  }, [token]);
  /**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {string} user token
 */
  async function register(username, password) {
    const r = await fetch(`${apiUrl()}/auth/register`, {
      body: JSON.stringify({ username, password }), method: 'POST', headers: {
        'Content-Type': 'application/json'
      }
    });
    if (r.ok) {
      const { token } = await r.json();
      setIsLoading(true);
      setToken(token);
    } else {
      return await r.json();
    }
  }
  async function login(username, password) {
    const r = await fetch(`${apiUrl()}/auth/login`, {
      body: JSON.stringify({ username, password }), method: 'POST', headers: {
        'Content-Type': 'application/json'
      }
    });
    if (r.ok) {
      const { token } = await r.json();
      setIsLoading(true);
      setToken(token);
    } else {
      return await r.json();
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser();
    setUsers([]);
    setToken();
  }
  const fetchUsersQuery = useQuery('fetchUsers', () => fetchUsers());

  return {
    users,
    currentUser,
    token,
    isLoading,
    setIsLoading,
    setToken,
    register,
    login,
    logout
  };
}

/**
 * @returns {Promise<Array<User> | null>}
 */
async function fetchUsers() {
  try {
    const users = await fetchWithAuth(`${apiUrl()}/users`).then(r => r.json());
    return users;
  } catch (e) {
    console.log('failed to fetch users', e);
    return null;
  }
}
export function UserProvider({ children }) {
  const r = useUsers();
  return <UserContext.Provider value={r}>
    {children}
  </UserContext.Provider>;
}