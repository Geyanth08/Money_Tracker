import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // console.log(user);
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assests/logo.png" alt="logo" className="navbar__logo" />
      </Link>
      {!user ? (
        <div className="navbar__links">
          <Link to="/login">
            <h4>Login</h4>
          </Link>
          <Link to="/signUp">
            <h4>SignUp</h4>
          </Link>
        </div>
      ) : (
        <div className="navbar__links">
          {/* <h3>{user.user.email}</h3> */}
          <button className="logout" onClick={handleLogout}>
            <h4>Logout</h4>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
