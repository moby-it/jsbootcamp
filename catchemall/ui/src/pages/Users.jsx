import { useContext } from "react";
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
export function Users() {
  const { users } = useContext(UserContext);
  const navigate = useNavigate();
  return <div className="col gap-1 mt-2 align w-100 align-center">
    <h1>Users</h1>
    <div className="user-list">
      {users.map(u =>
        <div key={u.id} className="card" onClick={()=> navigate(`/user/${u.id}`)}>
          <span>{u.username}</span>
          <span>{u.caughtpokemon}</span>
        </div>)
      }
    </div>
  </div>;
}