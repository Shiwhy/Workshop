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
    {users.map((customer) => {
      return <div className="view" key={customer.customer_id}>
        <h5>{customer.customer_id}</h5>
        <h5>{customer.customer_name}</h5>
        <h5>{customer.contact}</h5>
        <h5>{customer.Address}</h5>
        <h5>{customer.email}</h5>
        <h5>{customer.value}</h5>
      </div>
    })}
    </>
  )
}

export default Users
