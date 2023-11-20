import React from 'react'

export default function LoginForm() {
  return (
    <>
    <div className="container form" id='signUp'>
      <h1>SignUp</h1>
      <div className="inputBox">
        <input type="text" required="required" />
        <span>Your Name</span>
      </div>
      <div className="inputBox">
        <input type="text" required="required" />
        <span>Username</span>
      </div>
      <div className="inputBox">
        <input type="text" required="required" />
        <span>Email</span>
      </div>
      <div className="inputBox">
        <input type="password" required="required" />
        <span>Password</span>
      </div>
      <button className='signupBtn'>Sign Up</button>
    </div>
    </>
  )
}