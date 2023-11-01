import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { UserContext } from "../context/userContext";
import { apiUrl } from "../utils/config";

export function useLogin() {
  const { setIsLoading, setToken } = useContext(UserContext);
  const mutation = useMutation('login', ({ username, password }) => fetch(`${apiUrl()}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({ username, password })
  }).then(async r => {
    const response = await r.json();
    if (r.ok) return response;
    throw response;
  }));
  useEffect(() => {
    if (mutation.isSuccess) {
      setIsLoading(true);
      setToken(mutation.data.token);
    }
  }, [mutation.isSuccess]);
  return mutation;
}