import React,{useEffect,useState} from 'react'
import axios from 'axios'

import { TbSettingsCog } from 'react-icons/tb'

const Stock = () => {


const [stock,setstock] = useState([]) 

useEffect (() => {
  axios.get('http://localhost:5000/parts')
  .then((res) => {
    setstock(res.data);
  })
},[])
  return (
    <>
    <div className="heading-div">
      <p className="heading"><TbSettingsCog/> Stock</p>
    </div>
    <div className="mainDivision">
      {stock.map((parts) => {
        return <div className="view" key={parts.part_id}>
          <div className="view-card">
            <p>
              <span>Part :&nbsp; </span>{parts.part_name}
            </p>
            <p>
              <span>Price :&nbsp; </span>{parts.price}
            </p>
            <p>
              <span>Units :&nbsp; </span>{parts.units}
            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Stock
