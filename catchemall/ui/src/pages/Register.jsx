import { useContext, useState } from "react";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
export function Register() {
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  const { register } = useContext(UserContext);
  async function submit(e) {
    e.preventDefault();
    console.log(username, password);
    await register(username, password);
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
      <button className="btn login-btn" type="submit" onClick={submit}>Register</button>
      <Link to="/login"> {"Already have an account? Login here"}</Link>
    </form>
  </Card>;
}