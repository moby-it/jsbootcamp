import { useContext } from "react";
import { UserContext } from '../context/userContext';
import { Card } from '../components/Card';
export function Users() {
  const { users } = useContext(UserContext);

  return <Card>
    {users.map(u => <h2 key={u.id} >{u.username}</h2>)}
  </Card>;
}