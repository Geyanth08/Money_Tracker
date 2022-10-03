import './signUp.css';
import { useState } from 'react';
import { useSignUp } from '../hooks/useSignUp';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const { signUp, error, loading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password1, password2);

    await signUp(email, password1);

    setEmail('');
    setPassword1('');
    setPassword2('');
  };

  return (
    <div className="container">
      <div className="signUp">
        <h3>SignUp</h3>
        <form>
          <div className="signUp__input">
            <label htmlFor="email">Enter Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signUp__input">
            <label htmlFor="password1">Enter Password</label>
            <input
              type="password"
              id="password1"
              name="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="signUp__input">
            <label htmlFor="password2">Re-Type Your Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button disabled={loading} onClick={handleSubmit}>
            SignUp
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
