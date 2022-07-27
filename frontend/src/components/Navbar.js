import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assests/logo.png" alt="logo" className="navbar__logo" />
      </Link>
    </div>
  );
}

export default Navbar;
