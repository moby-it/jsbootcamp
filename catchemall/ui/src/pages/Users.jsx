import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useUsers } from '../hooks';
import { moveToTop } from '../utils/moveToTop';
export function Users() {
    const { currentUser } = useContext(UserContext);
    const users = useUsers();
    const navigate = useNavigate();
    if (users.isLoading) return <section className="col gap-1 mt-2 align w-100 align-center">Loading...</section>;
    return (
        <section className="col gap-1 mt-2 align w-100 align-center">
            <h1>Users</h1>
            <article className="user-list">
                {users.isSuccess &&
                    moveToTop(users.data, (u) => u.id === currentUser.id).map((u) => (
                        <p
                            key={u.id}
                            className={u.id === currentUser.id ? 'card current-user' : 'card'}
                            onClick={() => navigate(`/user/${u.id}`)}
                        >
                            <span>{u.username}</span>
                            <span>{u.caughtpokemon}</span>
                        </p>
                    ))}
            </article>
        </section>
    );
}
