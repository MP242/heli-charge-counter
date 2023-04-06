import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <Link to="/" style={{ margin: '5em' }}>
        Accueil !
      </Link>
      <Link to="/users" style={{ margin: '5em' }}>
        Users
      </Link>
      {isLoggedIn ? (
        <Link to="/" style={{ margin: '5em' }} onClick={handleLogout}>
          Déconnexion
        </Link>
      ) : (
        <Link to="/login" style={{ margin: '5em' }}>
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
