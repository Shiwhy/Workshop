import React from 'react';
import '../css/logSignForm.css'
import { NavLink } from 'react-router-dom';
// import verifyLogin from '../db/db_con'


// ---- Icons ----
import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoGoogle } from "react-icons/bi";
// ---- x Icons x ----

export default function LoginForm() {

  function loginBtn() {
    // var uname = document.getElementById('username');
    // var pass = document.getElementById('password'); 

    // var verify = verifyLogin(uname.value, pass.value);
    // alert(verify);
    console.log('hakdshfk');
  }

  return (
    <>
    <div className="container form" id='loginForm'>
      <h1>Login</h1>
      <div className="inputBox">
        <input type="text" id='username' required="required" />
        <span>Email</span>
      </div>
      <div className="inputBox">
        <input type="password" id='password' required="required" />
        <span>Password</span>
      </div>
      <button className='loginBtn' onClick={loginBtn}>Log In</button>
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
    </div>
    </>
  )
}