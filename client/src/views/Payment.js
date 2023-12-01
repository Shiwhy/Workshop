import React,{useEffect,useState} from 'react'
import axios from 'axios'

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
    <div className="mainDivision">
      {payment.map((payment) => {
        return <div className="view" key={payment.payment_id}>
          <div className="view-card">
            <p>
              <span>Status :&nbsp; </span> {payment.value}
            </p>
            <p>
              <span>Type :&nbsp; </span> {payment.payment_type}
            </p>
            <p>
              <span>Amount :&nbsp; </span> {payment.amount}
            </p>
            <p>
              <span>Bank Account :&nbsp; </span> {payment.bank_acc}
            </p>
            <p>
              <span>ACK no :&nbsp; </span> {payment.ack_no}
            </p>
            <p>
              <span>Payment date :&nbsp; </span> {payment.payment_date}
            </p>
            <p>
              <span>Invoice ID :&nbsp; </span> {payment.invoice_id}
            </p>
            <p>
              <span>Invoice Status :&nbsp; </span> {payment.inv_value}
            </p>
            <p>
              <span>Invoice no :&nbsp; </span> {payment.invoice_no}
            </p>
            <p>
              <span>Invoice name :&nbsp; </span> {payment.invoice_name}
            </p>
            <p>
              <span>Customer :&nbsp; </span> {payment.customer_name}
            </p>
            <p>
              <span>Vehicle :&nbsp; </span> {payment.vehicle_model}
            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Payment
