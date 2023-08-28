import { createContext, useEffect, useState } from "react";
import { decodeJwt, fetchWithAuth, tokenIsValid } from "./auth.helpers";
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
 * @property {boolean} isLoading
 * @property {()=> Promise<void>} init
 * @property {(username,password)=> Promise<boolean>} register
 * @property {(username,password)=> Promise<boolean>} login
 * 
 */


/**
 * @type {React.Context<UserContextValue>}
 */
export const UserContext = createContext(null);


const localStorageToken = tokenIsValid(localStorage.getItem('token)')) || '';

/**
 * 
 * @returns {UserContextValue}
 */
function useUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState(localStorageToken);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!token) {
      setCurrentUser(null);
      setUsers([]);
      return;
    }
    localStorage.setItem('token', token);
    fetchUsers().then(users => {
      const user = decodeJwt(token);
      setCurrentUser(user);
      setUsers(users);
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

  async function init() {
    const users = await fetchUsers();
    const user = decodeJwt(localStorageToken);
    setCurrentUser(user);
    setUsers(users);
    setIsLoading(false);
  }

  return {
    users,
    currentUser,
    token,
    isLoading,
    init,
    register,
    login,
  };
}

export function UserProvider({ children }) {
  const r = useUsers();
  return <UserContext.Provider value={r}>
    {children}
  </UserContext.Provider>;
}