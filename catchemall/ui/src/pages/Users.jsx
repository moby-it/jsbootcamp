import { useContext } from "react";
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import { moveToTop } from "../utils/moveToTop";
export function Users() {
  const { users, currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  return <section className="col gap-1 mt-2 align w-100 align-center">
    <h1>Users</h1>
    <article className="user-list">
      {moveToTop(users, (u) => u.id === currentUser.id).map(u =>
        <p key={u.id} className={u.id === currentUser.id ? 'card current-user' : 'card'} onClick={() => navigate(`/user/${u.id}`)}>
          <span>{u.username}</span>
          <span>{u.caughtpokemon}</span>
        </p>)
      }
    </article>
  </section>;
}