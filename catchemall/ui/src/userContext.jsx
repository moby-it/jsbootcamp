import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { apiUrl } from "./config";
import { fetchWithAuth } from "./fetchWithAuth";

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

/**
 * 
 * @returns {UserContextValue}
 */
function useUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!token) {
      setCurrentUser(null);
      setUsers([]);
      return;
    }
    localStorage.setItem('token', token);
    const user = decodeJwt(token);
    setCurrentUser(user);
    fetchUsers().then(({ data }) => {
      setUsers(data);
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
  return {
    users,
    currentUser,
    token,
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
/**
 * 
 * @param {string} jwt 
 * @returns {User}
 */
function decodeJwt(jwt) {
  const decoded = jwt_decode(jwt);
  return decoded;
}