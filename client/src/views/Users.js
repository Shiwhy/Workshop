import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:5000/customer')
    .then((res) => {
      setUsers(res.data)
    })
  }, [])

  return (
    <>
    <h1>Users</h1>
    <div className="mainDivision">

    {users.map((customer) => {
      return <div className="view" key={customer.customer_id}>
          <div className="view-card" >
            <p className="plate">{customer.registration_no}</p>
            <p>
              <span>Name :&nbsp; </span> {customer.customer_name}
            </p>
            <p>
              <span>Contact :&nbsp;</span> {customer.contact}
            </p>
            <p>
              <span>Address :&nbsp; </span> {customer.Address}
            </p>
            <p>
              <span>Email :&nbsp; </span> {customer.email}
            </p>
            <p>
              <span>Vehicle :&nbsp;</span> {customer.vehicle_model}
            </p>
            <p>
              <span>Status :&nbsp;</span> {customer.value}
            </p>
          </div>
       </div>
    })}
    </div>
    </>
  )
}

export default Users
