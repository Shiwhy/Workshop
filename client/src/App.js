import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ---- Components ----
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import About from './components/About';
import Jobcard from './components/Jobcard';
 import Dashboard from './components/Dashboard';
import Invoice from './components/Invoice';
// ---- x Components x ----

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>   
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/about' element={<About />} />
            <Route path='/jobcard' element={<Jobcard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/invoice' element={<Invoice />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
