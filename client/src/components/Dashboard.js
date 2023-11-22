import React, { useState, useEffect } from 'react';
import '../css/dashboard.css'
import DashboardProps from '../Utils/DashboardProps';


// ---- Icons ----
import{ VscDashboard, VscFeedback } from 'react-icons/vsc';
import { IoCarSport } from 'react-icons/io5';
import { PiUsersThreeFill, PiClipboardTextFill } from 'react-icons/pi';
import { MdEngineering, MdPendingActions, MdAdminPanelSettings } from 'react-icons/md';
import { TbTruckDelivery, TbSettingsCog } from 'react-icons/tb';
import { HiCurrencyRupee } from 'react-icons/hi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';

// ---- x Icons x ----

export default function Dashboard() {

  var admin = document.getElementById("adminPanel")
  var adminTitle = document.getElementById("titleAdmin")
  var dashboard = document.getElementById("dashboard")
  var dashBoardTitle = document.getElementById("titleDashboard")
  var details = document.getElementById("details")
  var detailsTitle = document.getElementById("titleDetails")

  var flag = 1
  function showDashboard() {
    if(flag === 1) {
      dashBoardTitle.style.display = 'block'
      dashboard.style.display = 'block'

      adminTitle.style.display = 'none'
      admin.style.display = 'none'
      detailsTitle.style.display = 'none'
      details.style.display = 'none'
    }
    else {
      dashboard.style.display = 'block'
    }
  }

  function showAdmin() {
    if(flag === 1) {
      adminTitle.style.display = 'block'
      admin.style.display = 'block'

      dashBoardTitle.style.display = 'none'
      dashboard.style.display = 'none'
      detailsTitle.style.display = 'none'
      details.style.display = 'none'
    }
    else {
      admin.style.display = 'block'
    }
  }

  function showDetails() {
    if(flag === 1) {
      detailsTitle.style.display = 'block'
      details.style.display = 'block'

      adminTitle.style.display = 'none'
      admin.style.display = 'none'
      dashBoardTitle.style.display = 'none'
      dashboard.style.display = 'none'
    }
    else {
      details.style.display = 'block'
    }
  }

  const [customer, setCustomer] = useState(0)
  const [emp, setEmp] = useState(0)
  const [vehicle, setVehicle] = useState(0)
  const [pendingWork,setPendingWork] = useState(0)
  const [pendingDelivery, setPendingDelivery] = useState(0)
  const [totalStock, setTotalStock] = useState(0)
  const [pendingPayment, setPendingPayment] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [jobcardCount, setJobcardCount] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try{

        // vehicle
        let vehicle = await fetch('http://localhost:5000/vehicle/count')
        let vehicleData = await vehicle.json()
        let vehicleCount = vehicleData[0].count
        setVehicle(vehicleCount)

        // customer
        let customer = await fetch('http://localhost:5000/customer/count')
        let customerData = await customer.json()
        let customerCount = customerData[0].count
        setCustomer(customerCount)

        // employee
        let emp = await fetch('http://localhost:5000/employee/count')
        let empData = await emp.json()
        let empCount = empData[0].count
        setEmp(empCount)

        // pending work
        let pendingWork = await fetch('http://localhost:5000/vehicle/pending/work')
        let pendingWorkData = await pendingWork.json()
        let pendingWorkCount = pendingWorkData[0].pendingWork
        setPendingWork(pendingWorkCount)

        // pending delivery
        let pendingDelivery = await fetch('http://localhost:5000/vehicle/pending/delivery')
        let pendingDeliveryData = await pendingDelivery.json()
        let pendingDeliveryCount = pendingDeliveryData[0].pendingDelivery
        setPendingDelivery(pendingDeliveryCount)

        // total stock
        let totalStock = await fetch('http://localhost:5000/parts/totalStock') 
        let totalStockData = await totalStock.json()
        let totalStockCount = totalStockData[0].totalStock
        setTotalStock(totalStockCount)

        // payment
        let pendingPayment = await fetch('http://localhost:5000/payment/pending')
        let pendingPaymentData = await pendingPayment.json()
        let pendingPaymentCount = pendingPaymentData[0].pendingPayment
        setPendingPayment(pendingPaymentCount)

        // feedback
        let feedbackCount = await fetch('http://localhost:5000/feedback/count')
        let feedbackData =  await feedbackCount.json()
        let feedbackCounter = feedbackData[0].count
        setFeedbackCount(feedbackCounter)


        // jobcard
        let jobcardCount = await fetch('http://localhost:5000/jobcard/count')
        let jobcardCountData = await jobcardCount.json()
        let jobcardCounter = jobcardCountData[0].count
        setJobcardCount(jobcardCounter)
        
      } catch(err){
        console.log('Error fetching data: ', err)
      }
    }
    fetchData()
  }, []);
  
  
  
  return (
    <>
    <div className="container">
      <div className="dashboard">


        <h4 className='dashboard-title' id='titleAdmin'> <MdAdminPanelSettings/> Admin</h4>
        <h4 className='dashboard-title' id='titleDashboard'> <VscDashboard/> Dashboard</h4>
        <h4 className='dashboard-title' id='titleDetails'> <CgDetailsMore/> Details</h4>
          
        <br />
        <div className="row">
          <div className="col-2">
            <div className="dashboard-menu" id='dashboardMenu'>
              <li><button id='toggleMenuBtn1' onClick={showAdmin}> <span><MdAdminPanelSettings/></span> Admin</button></li>
              <li><button id='toggleMenuBtn2' onClick={showDashboard}> <span><AiOutlineDashboard/></span> Dashboard</button></li>
              <li><button id='toggleMenuBtn3' onClick={showDetails}> <span><CgDetailsMore/></span> Details</button></li>
            </div>
          </div> 

          <div className="col" id='adminPanel'>
            <div className="container">
              <h1>Admin Panel</h1>
            </div>
          </div>

          <div className="col-8" id='dashboard'>
            <div className="container">
              <div className="row">                               {/* ------------------------ First Row */}
                <div className="col">
                  <DashboardProps icon={<IoCarSport/>} title='Total Vehicles' value={ vehicle } />
                </div>
                <div className="col">
                  <DashboardProps icon={<PiUsersThreeFill/>} title='Total Users' value={ customer }/> 
                </div>
                <div className="col">
                  <DashboardProps icon={<MdEngineering/>} title='Total Employees' value={ emp } />
                </div>
              </div>

                <br /><br />

              <div className="row">                               {/* ------------------------ Second Row */}
                <div className="col">
                  <DashboardProps icon={<MdPendingActions/>} title='Pending Work' value={ pendingWork } />
                </div>
                {/* <div className="col">
                  <DashboardProps icon={<MdBookOnline/>} title='Online Registrations' value='x'/>
                </div> */}
                <div className="col">
                  <DashboardProps icon={<TbSettingsCog/>} title='Total Stocks' value={ totalStock } />
                </div>
                <div className="col">
                  <DashboardProps icon={<TbTruckDelivery />} title='Pending Delivery' value={ pendingDelivery } />
                </div>
              </div>

                <br /><br />

              <div className="row">
                <div className="col">
                  <DashboardProps icon={<HiCurrencyRupee/>} title='Remaining Payment' value={ pendingPayment } />
                </div>
                <div className="col">
                  <DashboardProps icon={<PiClipboardTextFill />} title='Jobcards' value={ jobcardCount } />
                </div>
                <div className="col">
                   <DashboardProps icon={<VscFeedback/>} title='Feedbacks' value={ feedbackCount } /> 
                </div>
              </div>
            </div>
          </div>

          <div className="col" id="details">
            <div className="container">
              <h1>Details</h1>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
