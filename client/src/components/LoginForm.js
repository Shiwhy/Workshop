import React, { useState } from 'react';
import '../css/logSignForm.css'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

import { LuSmilePlus } from "react-icons/lu";


export default function LoginForm() {

  const navigate = useNavigate();
  
  const data = { username: '', password: '' };
  const [inputData, setInputData] = useState(data)

  const handleData = (e) => {
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

  const handleLogin =  async (e) => {
    e.preventDefault();
    var error = document.getElementById('error')
    

    if(!inputData.username || !inputData.password) {
        error.style.display = 'block';
    } else {
      try{
        const res = await  axios.post('http://localhost:5001/login', inputData, {
          headers:{
            'Content-Type': 'application/json'
          }
        });

        if(res.status===200) {
          navigate('/home')
        } else {
          alert('login failed')
        }
      } catch(err) {
        // alert('Invalid Username or Password')

        if(error.style.display === 'none') {
          error.style.display = 'block';
        }else{
          error.style.display = 'block';
        }
        console.error(err)
      }
    }
  }

  return (
    <>
    <form className="container form" id='loginForm'>
      <h1>Login</h1>
      <div className="inputBox">
        <input type="text" id='username' name='username' value={ inputData.username } onChange={ handleData } required="required" />
        <span>Username</span>
      </div>
      <div className="inputBox">
        <input type="password" id='password' name='password' value={ inputData.password } onChange={ handleData } required="required" />
        <span>Password</span>
      </div>

      <p id='error'>Invalid Username or Password</p>

      <button className='loginBtn' type='submit' onClick={ handleLogin } >Log In</button>
      
      <p>Don't have an account?  <NavLink to="/signup" className='signup-link'>SignUp here</NavLink></p>

      <span className='note'> <LuSmilePlus/> Signup First</span>

    </form>
    </>
  )
}