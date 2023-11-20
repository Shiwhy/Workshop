import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import DashboardProps from '../Utils/DashboardProps';

import { NavLink } from 'react-router-dom'
// import { dbValue } from '../DB_Connection';

// ---- Icons ----
import{ VscDashboard } from 'react-icons/vsc';
import { IoCarSport } from 'react-icons/io5';
import { PiUsersThreeFill } from 'react-icons/pi';
import { MdEngineering } from 'react-icons/md';
import { MdPendingActions } from 'react-icons/md';
import { MdBookOnline } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { TbSettingsCog } from 'react-icons/tb';
import { HiCurrencyRupee } from 'react-icons/hi';
import { VscFeedback } from "react-icons/vsc";
import { MdAdminPanelSettings } from 'react-icons/md';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
// ---- x Icons x ----

export default function Dashboard() {
  
  // ApI CALL
  const [totalVehicle, setTotalVehicle] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalEmp, setTotalEmp] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Employee
        const empResponse = await fetch('http://localhost:5000/countEmployee')
        const empData = await empResponse.json();
        const empCount = empData[0].count;
        setTotalEmp(empCount)

        // Customer
        const customerResponse = await fetch('http://localhost:5000/countCustomer');
        const customerData = await customerResponse.json();
        const customerCount = customerData[0].count;
        setTotalCustomer(customerCount);

        // Vehicle
        const vehicleResponse = await fetch('http://localhost:5000/countVehicle');
        const vehicleData = await vehicleResponse.json();
        const vehicleCount = vehicleData[0].count;
        setTotalVehicle(vehicleCount);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
    <div className="container">
      <div className="dashboard">

        <h1 className='dashboard-title'> <VscDashboard/> Dashboard</h1>
          
        <div className="row">
          <div className="col-3">
            <div className="container dashboard-menu">
              <li><NavLink href="#"> <span className='card-menu-logo'><MdAdminPanelSettings/></span> Admin</NavLink></li>
              <li><NavLink href="#"> <span className='card-menu-logo'><AiOutlineDashboard/></span> Dashboard</NavLink></li>
              <li><NavLink href="#"> <span className='card-menu-logo'><CgDetailsMore/></span> Details</NavLink></li>
            </div>
          </div> 
          
          &nbsp;

          <div className="col-8">
            <div className="container dashboard-side">
              <div className="row">                               {/* ------------------------ First Row */}
                <div className="col">
                  <DashboardProps icon={<IoCarSport/>} title='Total Vehicles' value={ totalVehicle } />
                </div>
                <div className="col">
                  <DashboardProps icon={<PiUsersThreeFill/>} title='Total Users' value={ totalCustomer }/> 
                </div>
                <div className="col">
                  <DashboardProps icon={<MdEngineering/>} title='Total Employees' value={ totalEmp } />
                </div>
              </div>

                <br /><br />

              <div className="row">                               {/* ------------------------ Second Row */}
                <div className="col">
                  <DashboardProps icon={<MdPendingActions/>} title='Pending Work' value='x' />
                </div>
                <div className="col">
                  <DashboardProps icon={<MdBookOnline/>} title='Online Registrations' value='x'/>
                </div>
                <div className="col">
                  <DashboardProps icon={<TbTruckDelivery />} title='Pending Delivery' value='x' />
                </div>
              </div>

                <br /><br />

              <div className="row">
                <div className="col">
                  <DashboardProps icon={<TbSettingsCog/>} title='Total Stocks' value='x' />
                </div>
                <div className="col">
                   <DashboardProps icon={<VscFeedback/>} title='Feedbacks' value='x' /> 
                </div>
                <div className="col">
                  <DashboardProps icon={<HiCurrencyRupee/>} title='Daily Revenue' value='x' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
