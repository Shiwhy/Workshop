import { React, useState } from 'react'
import '../css/invoice.css'
import { RiDeleteBinLine } from 'react-icons/ri';
// import InvoiceProps from '../Utils/InvoiceProps';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { BiSave } from 'react-icons/bi';
import Navbar from './Navbar';
import axios from 'axios'

export default function Invoice() {

  // ----------- Add Table Rows -------------
  const [rows, setRows] = useState([
    {
      id: 1,
      parts: <input type="text" className='input-1' />, 
      quantity: <input type="text" className='input-2' />,
      price: <input type="text" className='input-2' />,
      amount: <input type="text" className='input-2' />,
    },
    {
      id: 2,
      parts: <input type="text" className='input-1' />,
      quantity: <input type="text" className='input-2' />,
      price: <input type="text" className='input-2' />,
      amount: <input type="text" className='input-2' />,
    },
  ]);

  const addRow = () => {
    const newRow = {
      id: new Date().getTime(),
      parts: <input type="text" className='input-1'/>, 
      quantity: <input type="text" className='input-2' />,
      price: <input type="text" className='input-2' />,
      amount: <input type="text" className='input-2' />
    };

    setRows([...rows, newRow]);
  };

  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const inv = {
    date:'', plate:'',
  }
  const [invData, setInvData] = useState(inv);

  const handleChange = (e) => {
    setInvData({ ...invData, [e.target.name]:e.target.value });
  };

  const addData = async () => {
    try {
      await axios.post('http://localhost:5001/invoice', invData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
    <Navbar/>


    
    <div className="invoice">
      <div className="container">
        <h1 className="invoice-title">
        <LiaFileInvoiceDollarSolid/> Invoice
        </h1>
      </div>
      
      <div className="container invoice-box">
        <div className="row">
          <div className="col">
            <div className="invoice-head">
              <h4>Garage Name</h4>
              <p className='head-text'>
                Garage Street Address, City, State, Postal Code. <br />
                +91 987654321 <br />
                garage@gmail.com
              </p>
            </div>  
          </div>
        <div className="col">
          <div className="calender">
            <span>Date : </span> 
            <input 
              type="date" 
              name='date' 
              value={invData.date} 
              onChange={handleChange}
            /> <br />
          </div>
          {/* <div className="dropdown">
            <span>Day : </span>
              <select>
                <option value="">Select a day</option>
                <option value="1">Sunday</option>
                <option value="2">Monday</option>
                <option value="3">Tuesday</option>
                <option value="4">Wednesday</option>
                <option value="5">Thursday</option>
                <option value="6">Friday</option>
                <option value="7">Saturday</option>
              </select>
          </div> */}
        </div>
        </div>
                  <hr />
        <div className="container invoice-details">
          <div className="customer-details">
            <div className="row">

              <div className="col">
                <span>Customer : </span> &nbsp;
                  <input type="text" 
                    name='customer'
                    value={invData.customer}
                    onChange={handleChange}
                  /> <br /><br />
                {/* <span>Address : </span> &nbsp;
                  <input type="text"
                    name='address'
                    value={invData.address}
                  
                  /> */}
              </div>

              <div className="col">
                <span>Invoice Number : </span> &nbsp;
                  <input type="text" 
                  /> <br /><br />

                <span>Vehicle Plate_no : </span> &nbsp;
                  <input type=" text" 
                    name='plate'
                    value={invData.plate}
                    onChange={handleChange}
                  />     
              </div>

            </div>
          </div>  
        </div>
                    <hr />
        <div className="container table">
          <table>
            <thead>
              <tr>
                <th>Description (part/service)</th>
                <th>Quantity (if part)</th>
                <th>Unit Price (if part)</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className='input-1'>{row.parts}</td>
                  <td className='input-2'>{row.quantity}</td>
                  <td className='input-2'>{row.price}</td>
                  <td className='input-2'>{row.amount}</td>
                  <td>
                    <button className='dltBtn' onClick={() => deleteRow(row.id)}> <RiDeleteBinLine/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='addBtn my-3' onClick={addRow}> Add </button>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col">
              <span>Total: </span><input type="text" readOnly/>
            </div>
          </div>
        </div>
        <button className='savebtn' onClick={addData}><BiSave/> Save</button>
      </div>
      <br /><br />
    </div>
    </>
  )
}

