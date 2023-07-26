import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
// import hamburger from '../../assets/hamburger.svg';
import './Navbar.scss';
import HamburgerMenu from '../Hamburger/HamburgerMenu';

export const Navbar = ({isLoggedIn, setIsLoggedIn})=> {
  let user = localStorage.getItem('user');
  const handleLogout = () => {
    user = localStorage.removeItem('user');
    // localStorage.removeItem('token');
    // localStorage.removeItem('userName');
    setIsLoggedIn(false);
  };

  return (
    <nav className="Navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="Navbar__logo" />
      </Link>
      {user && <HamburgerMenu handleLogout={handleLogout} />}
    </nav>
  );
};
