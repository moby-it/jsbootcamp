import { useContext, useState } from "react";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
export function Register() {
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  const [error, SetError] = useState('');
  const { register } = useContext(UserContext);
  async function submit(e) {
    SetError('');
    e.preventDefault();
    console.log(username, password);
    const r = await register(username, password);
    if (r) SetError(r.error);
  }
  return <Card classes={['mt-2']}>
    <form className="login-form">
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onKeyUp={(e) => SetUsername(e.target.value)} />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onKeyUp={(e) => SetPassword(e.target.value)} />
      </div>
      {error && <span className="error">{error}</span>}
      <button className="btn login-btn" type="submit" onClick={submit}>Register</button>
      <div style={{ textAlign: "center" }}>
        Already have an account?<br /><Link to="/login">Login here</Link>
      </div>
    </form>
  </Card>;
}