import React, {useEffect, useState} from 'react';
import './css/vehicle.css';
import axios from 'axios';

const Vehicle = () => {

  const [vehicleData, setVehicleData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/vehicle')
    .then((res) => {
      setVehicleData(res.data)
    });
  }, [])

  return (
    <>
    <div className="container">
      <h3>All Vehicles</h3>

      {vehicleData.map((data) => {
        return(
          <div>
            {data.id}
          </div>
        )
      })}


    </div>
    </>
  )
}

export default Vehicle
