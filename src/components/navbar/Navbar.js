import React, { useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getFilteredApartments } from '../../redux/filter/filter.actions';

function Navbar() {
  const [hamburgerActiv, setHamburgerActiv] = useState(false);

  const hamburgerOpen = () => {
    setHamburgerActiv(!hamburgerActiv);
  };
 

  return (
    <>
      <section className='menu'>
        <div className='menu-container'>
          <Link to='/' className='menu__logo'>
           LOgo
          </Link>
          <div className='menu__navigation'>
            <Link to='/about'>
              About
            </Link>
            <Link to='/boxshadow'>
              Box Shadow
            </Link>
            <Link to='/partners'>
              Partners
            </Link>
            <Link to='/contacts'>
              Contacts
            </Link>
          </div>
          <div className='hamburger-mb-menu' onClick={hamburgerOpen}>
            <span
              className={!hamburgerActiv ? 'hamburger1' : 'hamburger11'}
            ></span>
            <span
              className={!hamburgerActiv ? 'hamburger2' : 'hamburger22'}
            ></span>
            <span
              className={!hamburgerActiv ? 'hamburger3' : 'hamburger33'}
            ></span>
          </div>

          <div className={hamburgerActiv ? 'menu-blok-active' : 'menu-blok'} onClick={hamburgerOpen}>
            <div className='menu-blok__container' onClick={(e) => { e.stopPropagation(); }}>
              <ul className='menu-blok__navigation'>
                <li onClick={hamburgerOpen}>
                  <Link to='/aboutus'>
                    About
                  </Link>
                </li>
                <li onClick={hamburgerOpen}>
                  <Link to='/partners'>
                    Partners
                  </Link>
                </li>
                <li onClick={hamburgerOpen}>
                  <Link to='/contacts'>
                    Contacts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



export default Navbar
