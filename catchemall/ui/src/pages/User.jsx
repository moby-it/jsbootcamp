import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { fetchWithAuth } from "../utils/auth.helpers";
import { apiUrl } from "../utils/config";

export function User() {
  let { id } = useParams();
  const { users } = useContext(UserContext);
  const { data, isLoading, isSuccess } = useQuery(['pokemonCaughtForUser'],
    () => fetchWithAuth(`${apiUrl()}/pokemon/caught/${id}`).then(r => r.json()), { enabled: true });
  const user = users.find(u => u.id === +id);
  if (!id) return <h1>Where are you going?</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (isSuccess) {
    console.log(user, data);
    return <h1>{JSON.stringify(data)}</h1>;
  }
}