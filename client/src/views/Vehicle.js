import React,{useEffect,useState} from 'react'
import axios from 'axios'


const Vehicle = () => {

  const [vehicle,setVehicle] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/vehicle')
    .then((res) => {
      setVehicle(res.data)
    })
  }, []);

  return (
    <>
    <h1>hello</h1>
    {vehicle.map((vehicle) => {

      return <div className="view" > 
        <h5>Type: {vehicle.vehicle_type}</h5>
        <h5>company: {vehicle.company_name}</h5>
        <h5>Model: {vehicle.vehicle_model}</h5>
        <h5>fuel: {vehicle.fuel_name}</h5>
        <h5>Reg: {vehicle.registration_no}</h5>
        <h5>KM: {vehicle.KMs}</h5>
        <h5>Customer: {vehicle.customer_name}</h5>
        <h5>Vehicle: {vehicle.value}</h5>
      </div>

    })}
    </>
  )
}

export default Vehicle
