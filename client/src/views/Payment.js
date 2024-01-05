import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Searchbar from '../Utils/Searchbar';

import { HiCurrencyRupee } from 'react-icons/hi'

const Payment = () => {

  const [payment,setpayment] = useState([]);

  useEffect (() => {
    axios.get('http://localhost:5000/payment')
    .then((res) => {
      setpayment(res.data);
    })
  }, [])

  return (
    <>
    <div className="heading-div">
      <p className="heading">< HiCurrencyRupee/> Pending Payment</p>
    </div>

    <div className="mainDivision">
      {payment.map((payment) => {
        return <div className="view" key={payment.payment_id}>
          <div className="view-card">
            
            <p className='plate'>{payment.registration_no}</p>

            <p>
              <span>Status :&nbsp; </span> {payment.paymentStatus}
            </p>
           
            <p>
              <span>Amount :&nbsp; </span> {payment.amount}
            </p>
           
            <p>
              <span>Customer :&nbsp; </span> {payment.customer_name}
            </p>

            <p>
              <span>Contact :&nbsp; </span> {payment.contact}
            </p>

            <p>
              <span>Vehicle_model :&nbsp; </span> {payment.vehicle_model}
            </p>

          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Payment
