import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(true);
  const classOne = collapsed
    ? 'collapse navbar-collapse'
    : 'collapse navbar-collapse show';
  const classTwo = collapsed
    ? 'navbar-toggler navbar-toggler-right collapsed'
    : 'navbar-toggler navbar-toggler-right';
  const toggleNavbar = useCallback(() => {
    setCollapsed((prev) => !prev);
  });

  return (
    <nav
      className='navbar navbar-expand-lg navbar-light bg-light'
      id='user-navigation'
    >
      <Link className='navbar-brand' to='/'>
        CryptoPass
      </Link>
      <button
        onClick={toggleNavbar}
        className={`${classTwo}`}
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className={`${classOne}`} id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/cryptos'>
              Cryptos
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/exchanges'>
              Exchanges
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/news'>
              News
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
