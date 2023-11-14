import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks';
export function Login() {
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const [error, SetError] = useState('');
    const login = useLogin();

    if (login.isError) {
        SetError(login.error.error);
        login.reset();
    }
    function submit(e) {
        e.preventDefault();
        login.mutate({ username, password });
    }

    return (
        <div className="mt-2 card">
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
                <button className="btn login-btn" type="submit" onClick={submit}>
                    Login
                </button>
                <div style={{ textAlign: 'center' }}>
                    {"Don't"} have an account?
                    <br />
                    <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
}
