import jwt_decode from "jwt-decode";

/**
 * 
 * @param {string} url 
 * @param {RequestInit} options 
 * @returns {Promise<Response>}
 */
export function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('token does not exist');
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers
    },
  });
}

/**
 * Take a token as an input. Returns null if token invalid and the token if it is valid.
 * 
 * @param {string} token 
 * @returns {boolean}
 */
export function tokenIsValid(token) {
  if (!token) return false;
  const decoded = decodeJwt(token);
  if (!decoded.exp) return false;
  if (decoded.exp < (new Date().getTime() + 1) / 1000) {
    return false;
  }
  return token;
}

/**
 * 
 * @param {string} jwt 
 * @returns {User}
 */
export function decodeJwt(jwt) {
  const decoded = jwt_decode(jwt);
  return decoded;
}