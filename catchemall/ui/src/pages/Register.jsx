import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks';

export function Register() {
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const [error, SetError] = useState('');
    const register = useRegister();

    if (register.error) {
        SetError(register.error);
        register.reset();
    }

    function submit(e) {
        e.preventDefault();
        register.mutate({ username, password });
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
                    Register
                </button>
                <div style={{ textAlign: 'center' }}>
                    Already have an account?
                    <br />
                    <Link to="/login">Login here</Link>
                </div>
            </form>
        </div>
    );
}
