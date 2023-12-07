import React, { useState } from 'react';
import axios from 'axios';
import '../css/jobcard.css'
import { BsCreditCard2Front } from 'react-icons/bs'
import { BiSave } from 'react-icons/bi'
import Navbar from './Navbar';

export default function Jobcard() {

  
  const details = {
    // customer
    name: '', address: '', contact: '', email: '', custStatus:'',

    // vehicle
    vehType: '', fuel: '', company: '', model: '', plate: '', kms: '',

    // employee
    empid: '', empName: '', empContact: '',
}
  const [data, setData] = useState(details)
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]:e.target.value });
  }

  const addData = async () => {
    try{
        await axios.post('http://localhost:5001/jobcard', data, {
        headers:{
          "Content-Type": "application/json"
        }
      });
      console.log(data)
    }catch(err){
      console.log(err)
    }
  }

  const getData = async () => {
    
  }

  return (
    <>
    <Navbar/>

    <div className="container jobcard">
      <h1 className='jobcard-title'><BsCreditCard2Front/> JobCard</h1> 
      <div className="jobcard-details">
      
        <h5>Customer Details</h5> <hr />
        <div className="input-box">
          <div className="row">
            <div className="col">
              <span>Name :</span> 
              <input 
                type="text"
                name='name'
                value={data.name}
                onChange={handleChange}
              /> 

              <span>Contact :</span> <span className='thumbnail'>(only numbers)</span>
              <input 
                type="number" 
                name='contact'
                value={data.contact}
                onChange={handleChange}
              />

              <span>Email :</span> 
              <input 
                type="text" 
                name='email'
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <span>Address :</span> 
              <textarea cols="30" rows="5"
                name="address"
                value={data.address}
                onChange={handleChange}
              ></textarea>

              <span>Status: </span>
              <select name="custStatus" onChange={handleChange} value={data.custStatus}>
                <option value="">Select Type</option>
                <option value="1">Active</option>
                <option value="2">Not-Active</option>
              </select>
            </div>
          </div>
        </div>

      
        <h5>Vehicle Details</h5> <hr />
        <div className="input-box">
          <div className="row">
            <div className="col">

              <span>Vehicle Type :</span> 
                <select name='vehType' onChange={handleChange} value={data.vehType}> 
                  <option value="">Select Type</option>
                  <option value="Four Wheel">Four Wheel</option>
                  <option value="Two Wheel">Two Wheel</option>
                  <option value="Three Wheel">Three Wheel</option>
                </select>

              <span>Fuel :</span>
                <select name='fuel' onChange={handleChange} value={data.fuel}>
                  <option value="1">Select Fuel</option>
                  <option value="2">Petrol</option>
                  <option value="3">Diesel</option>
                  <option value="4">CNG</option>
                  <option value="5">EV</option>
                </select>

              <span>Vehicle Company: </span> 
                <select name='company' onChange={handleChange} value={data.company}>
                  <option value="">Select Company</option>
                  <option value="1">Tata</option>
                  <option value="2">Hyundai</option>
                  <option value="3">Toyota</option>
                  <option value="4">Mercedes</option>
                  <option value="5">Audi</option>
                </select>
            </div>
            <div className="col">
              <span>Model :</span> 
              <input 
                type="text" 
                onChange={handleChange}
                name='model'
                value={data.model}
              />

              <span>Number Plate :</span> 
              <input 
                type="text" 
                onChange={handleChange}
                name='plate'
                value={data.plate}
              />

              <span>KmS Travelled :</span> <span className="thumbnail">(only numbers)</span>
              <input 
                type="number" 
                onChange={handleChange}
                name='kms'
                value={data.kms}
              />

            </div>
            <div className="col">
              <span>Date of Vehicle Received :</span> 
              <input 
                type="date" 
                name='receiveDate'

              />

              <span>Completion Date :</span> 
              <input 
                type="date"
                name='completionDate' 
              />

              <span>Delivery Date :</span> 
              <input 
                type="date" 
                name='deliveryDate'
              />

            </div>
          </div>
        </div>

          <h5>Complains</h5> <hr />
          <div className="input-box">
            <div className="row">
              <div className="col">
                <span>Complains :</span> 
                <textarea cols="70" rows="10"
                  className='complain-box'
                  name='complain'
                ></textarea>
                
              </div>
              <div className="col">
                <span>Requested Service :</span> 
                <textarea cols="70" rows="10"
                  className='complain-box'
                  name='requestedService'
                ></textarea>
              </div>
            </div>
          </div>

          <h5>Other</h5> <hr />
          <div className="input-box">
            <div className="row">
              <div className="col">
                <h6>Employee Assigned </h6>
                <span>ID :</span> 
                <input 
                  type="text" 
                  className='empid'
                  name='empid'
                  value={data.empid}
                  onChange={handleChange}
                />
                <button className='empdetail' onClick={getData}>Get</button>

                <span>Name :</span> 
                <input 
                  type="text" 
                  name='empName'
                  value={data.empName}
                />

                <span>Contact :</span> 
                <input 
                  type="text"
                  name='empContact' 
                  value={data.empContact}
                />

              </div>
              <div className="col">
                <h6>Service status</h6>
                <span>Current :</span>
                  <select name='vehicleStatus'>
                    <option value="1">Pending</option>
                    <option value="2">Complete</option>
                    <option value="3">Delivered</option>
                  </select>
                <span>Expected Completion Date :</span> <input type="date" /> 
              </div>
              <div className="col">
                <h6>Parts Required</h6>
                <textarea cols="30" rows="8"></textarea>
              </div>
              <div className="col">
                <h6>Payment</h6>
                <span>Method :</span>
                  <select name='paymentMethod'>
                    <option value="1">Cash</option>
                    <option value="2">UPI</option>
                    <option value="3">Bank Transfer</option>
                  </select>
                <span>Amount :</span> <input type="text" />
                <span>Status :</span> 
                  <select name='paymentStatus'>
                    <option value="1">Pending</option>
                    <option value="2">Done</option>
                  </select>
              </div>
            </div>
          </div>
          <button onClick={addData} className='savebtn'><BiSave/> Save</button>
      </div>
      <br /><br />
    </div>
    </>
  )
}
