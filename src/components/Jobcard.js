import React from 'react';
import '../css/jobcard.css'
import { BsCreditCard2Front } from 'react-icons/bs'
import { BiSave } from 'react-icons/bi'

export default function Jobcard() {
  return (
    <>
    <div className="container jobcard">
      <h1 className='jobcard-title'><BsCreditCard2Front/> JobCard</h1> 
      <div className="jobcard-details">
      
        <h5>Customer Details</h5> <hr />
        <div className="input-box">
          <div className="row">
            <div className="col">
              <span>Name :</span> <input type="text" /> 
              <span>Contact :</span> <input type="text" />
              <span>Email :</span> <input type="text" />
            </div>
            <div className="col">
              <span>Address :</span> <textarea name="" id="" cols="30" rows="5"></textarea>
            </div>
          </div>
        </div>

        <h5>Vehicle Details</h5> <hr />
        <div className="input-box">
          <div className="row">
            <div className="col">
              <span>Vehicle Type :</span> 
                <select>
                  <option value="0">Select Type</option>
                  <option value="1">Four Wheel</option>
                  <option value="2">Two Wheel</option>
                  <option value="3">Three Wheel</option>
                </select>
              <span>Fuel :</span>
                <select>
                  <option value="1">Select Fuel</option>
                  <option value="2">Petrol</option>
                  <option value="3">Diesel</option>
                  <option value="4">CNG</option>
                </select>
              <span>Vehicle Company: </span> <input type="text" />
            </div>
            <div className="col">
              <span>Model :</span> <input type="text" />
              <span>Number Plate :</span> <input type="text" />
              <span>KmS Travelled :</span> <input type="text" />
            </div>
            <div className="col">
              <span>Date of Vehicle Received :</span> <input type="date" />
              <span>Completion Date :</span> <input type="date" />
              <span>Delivery Date :</span> <input type="date" />
            </div>
          </div>
        </div>

          <h5>Complains</h5> <hr />
          <div className="input-box">
            <div className="row">
              <div className="col">
                <span>Complains :</span> <textarea className='complain-box' cols="70" rows="10"></textarea>
              </div>
              <div className="col">
                <span>Requested Service :</span> <textarea className='complain-box' cols="70" rows="10"></textarea>
              </div>
            </div>
          </div>

          <h5>Other</h5> <hr />
          <div className="input-box">
            <div className="row">
              <div className="col">
                <h6>Employee Assigned </h6>
                <span>ID :</span> <input type="text" />
                <span>Name :</span> <input type="text" />
                <span>Contact :</span> <input type="text" />
              </div>
              <div className="col">
                <h6>Service status</h6>
                <span>Current :</span>
                  <select>
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
                  <select>
                    <option value="1">Cash</option>
                    <option value="2">UPI</option>
                    <option value="3">Bank Transfer</option>
                  </select>
                <span>Amount :</span> <input type="text" />
                <span>Status :</span> 
                  <select>
                    <option value="1">Pending</option>
                    <option value="2">Done</option>
                  </select>
              </div>
            </div>
          </div>
          <button><BiSave/> Save</button>
      </div>
      <br /><br />
    </div>
    </>
  )
}
