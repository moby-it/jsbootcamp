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