import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { MdEngineering } from "react-icons/md";

const Employee = () => {

  const  [emp,setemp] = useState([])
  
  useEffect (() => {
    axios.get('http://localhost:5000/employee')
    .then((res) => {
      setemp(res.data)
    }) 
  });

  const navigate = useNavigate()
  const addemp = () => {
    navigate('/addemp')
  } 

  return (
    <>
    <div className="heading-div">
      <p className="heading"><MdEngineering/> Employee</p>
      <button className='addbtn' onClick={addemp}> Add Employee</button>
    </div>

    
    <div className="mainDivision">

      {emp.map((employee) =>{
        return <div className="view" key={employee.emp_id}>
          <div className="view-card">
            <p className='plate'>
              {employee.designation}
            </p>
            <p>
              <span>Name :&nbsp; </span>{employee.emp_name}
            </p>
            <p>
              <span>Contact :&nbsp; </span>{employee.contact}
            </p>
            <p>
              <span>Address :&nbsp; </span>{employee.address}
            </p>
            <p>
              <span>Salary :&nbsp; </span>{employee.salary}
            </p>
            <p>
              <span>Email :&nbsp; </span>{employee.email}
            </p>
            <p>
              <span>Bank Account :&nbsp; </span>{employee.bank_acc}
            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Employee
