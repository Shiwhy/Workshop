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
    <div className="mainDivision">
      {delivery.map((deliveryData) => {
        return <div className="view" key={deliveryData.vehicle_id}>
          <div className="view-card">
            <p className='plate'>{deliveryData.registration_no}</p>
            <p>
              <span>Type :&nbsp; </span>{deliveryData.vehicle_type}
            </p>
            <p>
              <span>Company :&nbsp; </span>{deliveryData.company_name}
            </p>
            <p>
              <span>Model :&nbsp; </span>{deliveryData.vehicle_model}
            </p>
            <p>
              <span>Fuel :&nbsp; </span>{deliveryData.fuel_name}
            </p>
            <p>
              <span>KMs :&nbsp; </span>{deliveryData.KMs}
            </p>
            <p>
              <span>Customer :&nbsp; </span>{deliveryData.customer_name}
            </p>
            <p>
              <span>Status :&nbsp; </span>{deliveryData.value}
            </p>
          </div>

        </div>
      })}
    </div>
       
    </>
  )
}

export default Delivery
