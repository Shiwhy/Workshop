import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Delivery = () => {

  const [delivery,setdelivery] = useState([])

  useEffect (() => {
    axios.get('http://localhost:5000/vehicle/pending/delivery')
    .then((res) => {
      setdelivery(res.data);
    })
  }, [])


  return (
    <>
    {delivery.map((deliveryData) => {
      return <div className="view" key={deliveryData.vehicle_id}>
         <h5>{deliveryData.vehicle_type}</h5>
          <h5>{deliveryData.company_name}</h5>
          <h5>{deliveryData.vehicle_model}</h5>
          <h5>{deliveryData.fuel_name}</h5>
          <h5>{deliveryData.registration_no}</h5>
          <h5>{deliveryData.KMs}</h5>
          <h5>{deliveryData.customer_name}</h5>
          <h5>{deliveryData.value}</h5>

      </div>
    })}
       
    </>
  )
}

export default Delivery
