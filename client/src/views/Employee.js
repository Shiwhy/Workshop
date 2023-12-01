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
    <div className="mainDivision">

      {emp.map((employee) =>{
        return <div className="view" key={employee.emp_id}>
          <div className="view-card">
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
            <p>
              <span>Designation :&nbsp; </span>{employee.designation}
            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Employee
