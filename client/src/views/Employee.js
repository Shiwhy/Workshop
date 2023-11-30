import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Employee = () => {

  const  [emp,setemp] = useState([])
  
  useEffect (() => {
    axios.get('http://localhost:5000/employee')
    .then((res) => {
      setemp(res.data)
    }) 
  })
  return (
    <>
    {emp.map((employee) =>{
      return <div className="view">
        <h5>{employee.emp_id}</h5>
        <h5>{employee.emp_name}</h5>
        <h5>{employee.contact}</h5>
        <h5>{employee.address}</h5>
        <h5>{employee.salary}</h5>
        <h5>{employee.email}</h5>
        <h5>{employee.bank_acc}</h5>
        <h5>{employee.designation}</h5>
      </div>
    })}
    </>
  )
}

export default Employee
