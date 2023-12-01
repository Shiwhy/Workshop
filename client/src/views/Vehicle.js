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
    <div className="mainDivision">

      {vehicle.map((vehicle) => {

        return <div className="view" key={vehicle.vehicle_id}> 
          <div className="view-card">
            <p className='plate'>{vehicle.registration_no}</p>
            <p><span>Type: </span> {vehicle.vehicle_type}</p>
            <p><span>company: </span> {vehicle.company_name}</p>
            <p><span>Model: </span> {vehicle.vehicle_model}</p>
            <p><span>fuel: </span> {vehicle.fuel_name}</p>
            <p><span>KM: </span> {vehicle.KMs}</p>
            <p><span>Customer: </span> {vehicle.customer_name}</p>
            <p><span>Vehicle: </span> {vehicle.value}</p>
          </div>
        </div>

      })}
    </div>
    </>
  )
}

export default Vehicle
