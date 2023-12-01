import React,{useEffect,useState} from 'react'
import axios from 'axios'


const Jobcarddetails = () => {

const [jobcard,setjobcard] = useState([])

useEffect (() => {
  axios.get('http://localhost:5000/jobcard')
  .then((res) => {
    setjobcard(res.data);
  })
},[])

  return (
    <>
    {jobcard.map((jobcard) => {
       return <div className="view" key={jobcard.jobcard_id}>
          <div className="view-card" >
            <p className="plate">{jobcard.registration_no}</p>
            <p>
              <span>Jobcard Date :&nbsp; </span> {jobcard.jobcard_date}
            </p>
            <p>
              <span>Jobcard status :&nbsp; </span> {jobcard.jobcardStatus}
            </p>
            <p>
              <span>Customer :&nbsp; </span> {jobcard.customer_name}
            </p>
            <p>
              <span>Emloyee :&nbsp; </span> {jobcard.emp_name}
            </p>
            <p>
              <span>Vehicle :&nbsp; </span> {jobcard.vehicle_model}
            </p>
            <p>
              <span>Complain :&nbsp; </span> {jobcard.complain}
            </p>
            <p>
              <span>Part :&nbsp; </span> {jobcard.part_name}
            </p>
            <p>
              <span>Payment :&nbsp; </span> {jobcard.value}
            </p>
            <p>
              <span>Invoice :&nbsp; </span> {jobcard.invoice_no}
            </p>
          </div>
       </div>
    })}
    </>
  )
}

export default Jobcarddetails
