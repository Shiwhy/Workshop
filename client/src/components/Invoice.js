import { React, useState } from 'react'
import '../css/invoice.css'
import { RiDeleteBinLine } from 'react-icons/ri';
// import InvoiceProps from '../Utils/InvoiceProps';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { BiSave } from 'react-icons/bi';
import Navbar from './Navbar';

import axios from 'axios';

export default function Invoice() {

  // ----------- Add Table Rows -------------

  const [totlAmount, setTotalAmount] = useState(0)
  const [rows, setRows] = useState([
    {
      id: 1,
      parts: <input type="text" className='input-1' name='invParts' />, 
      quantity: <input type="text" className='input-2' name='invQuantity' />,
      price: <input type="text" className='input-2' name='invPrice' />,
      amount: <input type="number" className='input-2 amount' name='invAmount' />,
    },
  ]);

  const addRow = () => {
    const newRow = {
      id: new Date().getTime(),
      parts: <input type="text" className='input-1' name='invParts' />, 
      quantity: <input type="text" className='input-2' name='invQuantity' />,
      price: <input type="text" className='input-2' name='invPrice' />,
      amount: <input type="number" className='input-2 amount' name='invAmount' />
    };

    setRows([...rows, newRow]);
  };

  
  const totalAmount = () => {
    var totAmnt = 0;
    const controls = Array.from(document.getElementsByClassName("amount"));
    for (let i = 0; i < controls.length; i++) {
      totAmnt = totAmnt + parseInt(controls[i].value);
    }
    setTotalAmount(totAmnt);
  }

  // const minusAmout = (index) => {
  //   var totAmnt = 0;
  //   const controls = Array.from(document.getElementsByClassName('amount'));
  //   totAmnt = totAmnt - parseInt(controls[0].value)
  //   setTotalAmount(totAmnt);

    
  // }
  

  

  const deleteRow = (id) => {
    // const updatedRows = rows.filter((row) => row.id !== id);
    // setRows(updatedRows);

    const newRows = [...rows];
    const deletedRow = newRows.splice(id, 1)[0];
    setRows(newRows);
    setTotalAmount(totlAmount - deletedRow.amount);
  };

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]:e.target.value });
  }

  const [invoiceData, setInvoiceData] = useState({ invParts:'', invQuantity:'', invPrice:'', invAmount:'' })
  const addInvoiceData = async () =>{
    try {
      await axios.post('http://localhost:5001/jobcard', invoiceData)
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
          
            /> <br />
          </div>
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
                    onChange={ handleChange }
                  /> 
                  
                  <br /><br />

              </div>

              <div className="col">
                <span>Invoice Number : </span> &nbsp;
                  <input type="text" 
                  /> 
                  
                  <br /><br />

                <span>Vehicle Plate_no : </span> &nbsp;
                  <input type=" text" 
                    name='plate'
                    onChange={ handleChange }

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
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className='input-1'>{row.parts}</td>
                  <td className='input-2'>{row.quantity}</td>
                  <td className='input-2'>{row.price}</td>
                  <td className='input-2' onChange={(e) => totalAmount(index, e.target.value)}>{row.amount}</td>
                  <td>
                    <button className='dltBtn' onClick={ deleteRow }> <RiDeleteBinLine/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='addBtn my-3' onClick={ addRow }> Add </button>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col">
              <span>Total: </span><input type="text" value={totlAmount} readOnly/>
            </div>
          </div>
        </div>
        <button className='savebtn' onClick={ addInvoiceData }><BiSave/> Save</button>
      </div>
      <br /><br />
    </div>
    </>
  )
}
