import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import hamburger from '../../assets/hamburger.svg';
import account from '../../assets/account.svg';
import logout from '../../assets/logout.svg';
import data from '../../assets/data.svg';
import './HamburgerMenu.scss';

const HamburgerMenu = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger">
      <div onClick={toggleMenu}>
        <img
          src={hamburger}
          alt="hamburger"
          className={`hamburger__icon ${isOpen ? 'rotate' : ''}`}
        />
      </div>
      <nav className={`hamburger__menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <div
              onClick={() => {
                toggleMenu();
                if (user) {
                  navigate(`/user/${user.userId}`);
                } else {
                  console.log("Vous n'êtes pas connecté");
                }
              }}
              className="hamburger__menu__row"
            >
              <img
                src={account}
                alt="account"
                className="hamburger__menu__icon"
              />
              <p>Mon compte</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                toggleMenu();                
                navigate('/myCounters');
              }}
              className="hamburger__menu__row"
            >
              <img src={data} alt="data" className="hamburger__menu__icon" />
              <p>Mes compteurs</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="hamburger__menu__row"
            >
              <img
                src={logout}
                alt="logout"
                className="hamburger__menu__icon"
              />
              <p>Deconnexion</p>
            </div>
          </li>
          {/* Ajoutez plus de liens ici */}
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
