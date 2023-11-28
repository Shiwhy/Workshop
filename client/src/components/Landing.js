import React from 'react';
import '../css/Landing.css';

import logoText from '../images/logoText.png';
import logoCar from '../images/logoCar.png';

import { NavLink } from 'react-router-dom';
import {AiOutlineUser} from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';

const Landing = () => {

  return (
    <>
    <div className="page">
      <div className="main">

      {/* <div className="cover"></div> */}
      <div className="pin"></div>

      <div className="cover-page">

          <div className="logoCar">
            <img src={logoCar} alt="/" />
          </div>

          <div className="logoText">
            <img src={logoText} alt="/" />
          </div>
      </div>

          <div className="links">
            <NavLink to='/login'> <AiOutlineUser/> Login </NavLink>
            <NavLink to='/signup'> <BiUserPlus/> Signup</NavLink>
          </div>


          <p className='slogan'>
            God Bless My Car
          </p>

      </div>
    </div>
    </>
  )
}

export default Landing
