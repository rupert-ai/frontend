import React from 'react';
import './noMatch.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Path1 } from './../../assets/images/liveBG2.svg';

function NoMatch() {

  return (
    <>
      <section id='error-404'>
        <Path1 className='error-404-bg'/>
        <div  className='error-404-contnent'>
          <h3>Oooops...</h3>
          <h1>404</h1>
          <h2>ERROR</h2>
          <h4>Sorry, page not found</h4>
          <Link to='/'>
            <button className='web-button-404'>Home Page</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default NoMatch;
