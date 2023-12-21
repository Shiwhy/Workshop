import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shery from 'sheryjs';



// ---- Components ----
// import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import About from './components/About';
import Jobcard from './components/Jobcard';
 import Dashboard from './components/Dashboard';
import Invoice from './components/Invoice';
import Landing from './components/Landing';
import Vehicle from './views/Vehicle';
import Users from './views/Users';
import Employee from './views/Employee';
import Work from './views/Work';
import Delivery from './views/Delivery';
import Feedback from './views/Feedback';
import Stock from './views/Stock';
import Payment from './views/Payment';
import Jobcarddetails from './views/Jobcarddetails';
// ---- x Components x ----

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Landing/> */}
          <Routes>   
            <Route path='/' element={<Landing/>} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/about' element={<About />} />
            <Route path='/jobcard' element={<Jobcard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/invoice' element={<Invoice />} />

            {/* views */}
            <Route path='/vehicleview' element={<Vehicle/>} /> 
            <Route path='/usersview' element={<Users/>} />
            <Route path='/empview' element={<Employee/>} />
            <Route path='/workview' element={<Work/>} />
            <Route path='/deliveryview' element={<Delivery/>} />
            <Route path='/feedbackview' element={<Feedback/>} />
            <Route path='/stockview' element={<Stock/>} />
            <Route path='/paymentview' element={<Payment/>} /> 
            <Route path='/jobcardview' element={<Jobcarddetails/>} /> 
          </Routes>
      </Router>
    </div>
  );
}

export default App;
