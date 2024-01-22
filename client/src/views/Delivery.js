import React,{useEffect,useState} from 'react'
import axios from 'axios'


import {TbTruckDelivery} from 'react-icons/tb'
import Searchbar from '../Utils/Searchbar'
const Delivery = () => {

  const [delivery, setdelivery] = useState([])

  useEffect (() => {
    axios.get('http://localhost:5000/vehicle/pending/delivery')
    .then((res) => {
      setdelivery(res.data);
    })
  }, []);

  const handleChange = (e) => {
    setSearchDelivery({...searchDelivery, [e.target.name]:e.target.value});
  }

  const [searchDelivery, setSearchDelivery] = useState({ pendingdelivery: '' });

  const searchData = async () => {
    try {
      const res = await axios.post('http://localhost:5001/search', searchDelivery)
      setdelivery(res.data)
    } catch(err)
    {
      console.log(err)
    }
  }

  const clearSearch = async () => {
    try{
        const res = await axios.get('http://localhost:5000/vehicle/pending/delivery')
        setdelivery(res.data)
        searchDelivery({ pendingdelivery: '' })
    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
    <div className="heading-div">
      <p className="heading">< TbTruckDelivery/> Delivery</p>

      <abbr title="Search customerName">
        <Searchbar
          placeholder= 'delivery'
          name= 'pendingdelivery'
          value = { searchDelivery.pendingdelivery }
          onChange ={ handleChange }
          onClick={ searchData }
          onClickClear= { clearSearch }
        />
      </abbr>

    </div>
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
