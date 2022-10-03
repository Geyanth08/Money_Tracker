import './login.css';
import { useState } from 'react';

import { useLogin } from '../hooks/useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    await login(email, password);

    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <div className="login">
        <h3>Login</h3>
        <form>
          <div className="login__input">
            <label htmlFor="email">Enter Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login__input">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button disabled={loading} onClick={handleSubmit}>
            Login
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
