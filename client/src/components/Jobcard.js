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

    // complain
    complains: '', reqService: '', compStatus: '',

    // payment
    paymentMethod: '', paymentStatus: '', amount: '',

    //parts
    partname: ''

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
    try {
      const response = await axios.post('http://localhost:5001/jobcard/employee', data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
        
      const { empName, empContact } = response.data;
      setData({
        ...data,
        empName: empName,
        empContact: empContact,
      });

    } catch (err) {
        console.log(err)
    }
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
                  <option value="">Select Fuel</option>
                  <option value="1">Petrol</option>
                  <option value="2">Diesel</option>
                  <option value="3">CNG</option>
                  <option value="4">EV</option>
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
            {/* <div className="col">
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

            </div> */}

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
          </div>
        </div>

          <h5>Complains</h5> <hr />
          <div className="input-box">
            <div className="row">
              <div className="col">
                <span>Complains :</span> 
                <textarea cols="70" rows="10"
                  className='complain-box'
                  name='complains'
                  value={data.complains}
                  onChange={handleChange}
                ></textarea>
                
              </div>
              <div className="col">
                <span>Requested Service :</span> 
                <textarea cols="70" rows="10"
                  className='complain-box'
                  name='reqService'
                  value={data.reqService}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-2">
                Status: <br />
                <select name="compStatus" onChange={handleChange} value={data.compStatus}>
                  <option value="">Select Status</option>
                  <option value="2">Pending</option>
                  <option value="1">Done</option>
                </select>
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
                <input readOnly
                  type="text" 
                  name='empName'
                  value={data.empName}
                  onChange={handleChange}
                />

                <span>Contact :</span> 
                <input readOnly
                  type="text"
                  name='empContact' 
                  value={data.empContact}
                  onChange={handleChange}
                />

              </div>
              {/* <div className="col">
                <h6>Service status</h6>
                <span>Current :</span>
                  <select name='vehicleStatus'>
                    <option value="1">Pending</option>
                    <option value="2">Complete</option>
                    <option value="3">Delivered</option>
                  </select>
                <span>Expected Completion Date :</span> <input type="date" /> 
              </div> */}
              <div className="col">
                <h6>Parts Required</h6>
                <textarea cols="30" rows="8" name='parts' value={data.parts} onChange={handleChange}></textarea>
                {/* <select name="/" >
                  <option value="">Select Part</option>
                  <option value=""></option>
                  <option value="">Select Part</option>
                  <option value="">Select Part</option>
                </select> */}
              </div>
              <div className="col">
                <h6>Payment</h6>
                <span>Method :</span>
                  <select name='paymentMethod' vaule={data.paymentMethod} onChange={handleChange}>
                    <option value="">Select Method</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank transfer">Bank Transfer</option>
                  </select>
                <span>Amount :</span> 
                <input 
                  type="text" 
                  name='amount'
                  value={data.amount}
                  onChange={handleChange}
                />
                <span>Status :</span> 
                  <select name='paymentStatus' value={data.paymentStatus} onChange={handleChange}>
                    <option value="">Select status</option>
                    <option value="1">Done</option>
                    <option value="2">Pending</option>
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
