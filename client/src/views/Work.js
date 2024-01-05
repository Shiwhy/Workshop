import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Searchbar from '../Utils/Searchbar';

import {MdPendingActions} from 'react-icons/md';

const Work = () => {

  const [work,setwork] = useState([])

  useEffect (() => {
    axios.get('http://localhost:5000/vehicle/pending/getwork')
    .then((res) => {
      setwork(res.data);
    })
  }, [])
  return (
    <>
    <div className="heading-div">
      <p className="heading"><MdPendingActions/>  Pending Work</p>
    </div>
    
    <div className="mainDivision">
      {work.map((pendingWork) => {
        return <div className='view' key={pendingWork.vehicle_id}>
          <div className="view-card">
            <p className='plate'>{pendingWork.registration_no}</p>
            <p>
              <span>Vehicle Type :&nbsp; </span>{pendingWork.vehicle_type}
            </p>
            <p>
              <span>Company :&nbsp; </span>{pendingWork.company_name}
            </p>
            <p>
              <span>Model :&nbsp; </span>{pendingWork.vehicle_model}
            </p>
            <p>
              <span>Fuel :&nbsp; </span>{pendingWork.fuel_name}
            </p>
            <p>
              <span>KMs :&nbsp; </span>{pendingWork.KMs}
            </p>
            <p>
              <span>Customer :&nbsp; </span>{pendingWork.customer_name}
            </p>
            <p>
              <span>Status :&nbsp; </span>{pendingWork.value}
            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Work

