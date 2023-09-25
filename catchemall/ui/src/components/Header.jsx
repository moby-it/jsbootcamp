import { LogOut, User, List } from 'iconoir-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export function Header() {
  const { logout } = useContext(UserContext);
  return <div className="header w-100 flex justify-between align-center" style={{ height: '100px' }}>
    <Link to="/">
      <h1>PokeList</h1>
    </Link>
    <div>
      <Link to={"/users"}><List height={40} width={40} className="cursor-pointer" />
      </Link>
      <Link to={"/user"}><User height={40} width={40} className="cursor-pointer" />
      </Link>
      <LogOut height={40} width={40} className="cursor-pointer" onClick={logout} />
    </div>
  </div>;
}