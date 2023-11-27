import React, { useState } from 'react';
import '../css/logSignForm.css'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

// ---- Icons ----
import { BiLogoFacebook, BiLogoTwitter, BiLogoGoogle } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
// ---- x Icons x ----

export default function LoginForm() {

  const navigate = useNavigate();
  
  const data = {username: '', password: ''}
  const [inputData, setInputData] = useState(data)

  const handleData = (e) => {
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

  const handleLogin =  async (e) => {
    e.preventDefault();
    

    if(!inputData.username || !inputData.password) {
      alert('All fields are Required')
    } else {
      try{
        const res = await  axios.post('http://localhost:5001/login', inputData, {
          headers:{
            'Content-Type': 'application/json'
          }
        });

        if(res.status===200) {
          // alert('login  succesfull')
          navigate('/home')
        } else {
          alert('login failed')
        }
      } catch(err) {
        alert('invalid username or password')
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

      <button className='loginBtn' type='submit' onClick={ handleLogin } >Log In</button>
      
      <p>Don't have an account?  <NavLink to="/signup" className='signup-link'>SignUp here</NavLink></p>
      <div className="social-links">
        <div className="row">
          <div className="col">
            <div>
              <a href='https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F&ec=GAlAwAE&hl=en_GB&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S1628195415%3A1692448803319014' className='google login-links'><BiLogoGoogle /></a>
            </div>
          </div>
          <div className="col">
            <div><a href="https://www.facebook.com/" className="facebook login-links"><BiLogoFacebook /></a></div>
          </div>
          <div className="col">
            <div><a href="https://www.instagram.com/accounts/login/" className="instagram login-links"><AiOutlineInstagram /></a></div>
          </div>
          <div className="col">
            <div><a href="https://twitter.com/i/flow/login" className="twitter login-links"><BiLogoTwitter /></a></div>
          </div>
        </div>
      </div>
    </form>
    </>
  )
}