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

// ---- views ----
import Vehicle from './views/Vehicle';
import Users from './views/Users';
import Emp from './views/Emp';
import Pendingwork from './views/Pendingwork';
import Stockview from './views/Stock';
import PendingDelivery from './views/PendingDelivery';
import Remnpayment from './views/Remnpayment';
import Jobcardview from './views/Jobcardview';
import Feedbackview from './views/Feedbackview';
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

            <Route path='/vehicle' element={<Vehicle />} />
            <Route path='/users' element={<Users/>} />
            <Route path='/emp' element={<Emp/>} />
            <Route path='/pendingwork' element={<Pendingwork/>} />
            <Route path='/stockview' element={<Stockview/>} />
            <Route path='/deliveryview' element={<PendingDelivery/>} />
            <Route path='/paymentview' element={<Remnpayment/>} />
            <Route path='/jobcardview' element={<Jobcardview/>} />
            <Route path='/feedbackview' element={<Feedbackview/>} />
            
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
