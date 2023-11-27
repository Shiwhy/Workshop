import React, { useState } from 'react'
import '../css/logSignForm.css'
import axios from 'axios'


export default function LoginForm() {

  const data = {
    name : "",
    username : "",
    password : "",
    email : "",
  }

  const [inputData, setInputData] = useState(data)

  const handleChange =(e) => {
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!inputData.username || !inputData.name || !inputData.password || !inputData.email) {
      alert("Please fill out all fields")
    } else if (!inputData.email.includes('@') || !inputData.email.includes('.')) {
      alert('Please enter valid email')
      return;
    }
    
    const response = await fetch('http://localhost:5001/signup', {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const data = await response.json()
    if(response.ok) {
      alert('signup succesfull')
    }else if(response.status === 400){
      alert('user already exist ')
    } else{
      alert('signup fail');
      console.log(data.error)
    }
    
  }



  return (
    <>
    <form className="container form" id='signUp'>
      <h1>SignUp</h1>
      <div className="inputBox">
        <input 
          type="text" 
          name='name' 
          value={inputData.name} 
          onChange={handleChange}
          />
        <span>Your Name</span>
      </div>
      <div className="inputBox">
        <input type="text"  name='username' value={inputData.username} onChange={handleChange}/>
        <span>Username</span>
      </div>
      <div className="inputBox">
        <input type="email" 
          name='email' 
          value={inputData.email}
          onChange={handleChange}
        />
        <span>Email</span>
      </div>
      <div className="inputBox">
        <input type="password" name='password' value={inputData.password} onChange={handleChange}/>
        <span>Password</span>
      </div>
      <button className='signupBtn' onClick={ handleSubmit }>Sign Up</button>
    </form>
    </>
  )
}