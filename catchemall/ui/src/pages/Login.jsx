import { useState } from "react";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
export function Login() {
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  function submit(e) {
    e.preventDefault();
    console.log(username, password);
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
      <button className="btn login-btn" type="submit" onClick={submit}>Login</button>
      <Link to="/register"> {"Don't have an account? Register here"}</Link>
    </form>
  </Card>;
}