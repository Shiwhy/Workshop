import './App.css';

function App() {


  function loginClick() {
    console.log("click")
  }


  return (
    <div className="App">
      <div className="login-form">
        <input type="email" placeholder='Enter email' required/>
        <input type="password" placeholder='Enter password' required/>
        <button onClick={loginClick}>Login</button>
        

      </div>
    </div>
  );
}

export default App;
