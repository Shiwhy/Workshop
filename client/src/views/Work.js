import React,{useEffect,useState} from 'react'
import axios from 'axios'

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
      {work.map((pendingWork) => {
        return <div className='view' key={pendingWork.vehicle_id}>
          <h5>{pendingWork.vehicle_type}</h5>
          <h5>{pendingWork.company_name}</h5>
          <h5>{pendingWork.vehicle_model}</h5>
          <h5>{pendingWork.fuel_name}</h5>
          <h5>{pendingWork.registration_no}</h5>
          <h5>{pendingWork.KMs}</h5>
          <h5>{pendingWork.customer_name}</h5>
          <h5>{pendingWork.value}</h5>

          
        </div>
      })}
    </>
  )
}

export default Work

