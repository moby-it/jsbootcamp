import { createContext, useState } from "react";

import { apiUrl } from "./config";

/**
 * @typedef {Object} User
 * @property {string} username
 */

/**
 * @typedef {Object} UserContextValue
 * @property {Array<User>} users
 * @property {User} currentUser
 * @property {string} token
 * @property {(username,password)=> Promise<boolean>} register
 * @property {(username,password)=> Promise<boolean>} login
 * 
 */


/**
 * @type {React.Context<UserContextValue>}
 */
export const UserContext = createContext(null);

function useUsersContext() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState('');
  /**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {string} user token
 */
  async function register(username, password) {
    const r = await fetch(`${apiUrl()}/auth/register`, { body: { username, password }, method: 'POST' });
    const t = await r.json();
    console.log("register:token for user ", username, " is ", t);
  }
  async function login(username, password) {
    const r = await fetch(`${apiUrl()}/auth/login`, { body: { username, password }, method: 'POST' });
    const t = await r.json();
    console.log("login:token for user ", username, " is ", t);
  };
  /**
   * @returns {Promise<Array<User> | null>}
   */
  async function fetchUsers() {
    try {
      const users = await fetch(`${apiUrl()}/users`).then(r => r.json());
      return users;
    } catch (e) {
      console.log('failed to fetch users', e);
      return null;
    }
  }
  return {
    users,
    currentUser,
    token,
    register,
    login,
  };
}

export function UserProvider({ children }) {
  // const { pokemonCaught, catchPokemon } = usePokedex();
  return <UserProvider.Provider value={null}>
    {children}
  </UserProvider.Provider>;
}
