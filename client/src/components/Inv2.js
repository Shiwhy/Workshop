import React, { useState } from 'react';
import '../css/invoice2.css';

import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { BiSave } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri'
import Navbar from './Navbar';
import axios from 'axios';


const Inv2 = () => {
  const [rows, setRows] = useState([{ description: '', quantity: 0, unit_price: 0, amount: 0 }]);
  const [total, setTotal] = useState(0);


  const [invData, setInvData] =  useState({ invDescription:rows.description, invQuantity:rows.quantity, invUnitPrice:rows.unit_price, invAmount:rows.amount, invTotal:'' });

  const handleChange = (e) => {
    setInvData({ ...invData, [e.target.name]:e.target.value })
  }

  const handleAddRow = () => {
    setRows([...rows, { description: '', quantity: 0, unit_price: 0, amount: 0 }]);
  };

  const handleDeleteRow = (index) => {
    let deletedRow;
    const newRows = [];
    for (let i = 0; i < rows.length; i++) {
      if (i !== index) {
        newRows.push({ ...rows[i] });
      } else {
        deletedRow = { ...rows[i] };
      }
    }
    setRows(newRows);
    setTotal(total - deletedRow.amount);
  };
  
  const handleAmountChange = (index, amount) => {
    const newRows = [...rows];
    newRows[index].amount = parseFloat(amount) || 0;
  
    const newTotal = newRows.reduce((acc, row) => acc + parseFloat(row.amount), 0);
    setRows(newRows);
    setTotal(newTotal);
  };


  const saveinv = async() => {
    try{
      await axios.post('http://localhost:5001/payment3', { rows, total }, {
        headers: { 'Content-Type': 'application/json' }
      });
    }catch(err){
      console.log(err);
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
              /> 
                        <br />
          </div>
        </div>

        <br /><hr />

        </div>
        <div className="container invoice-details">
          <div className="customer-details">
            <div className="row">

              <div className="col">
                <span>Customer : </span> &nbsp;
                  <input type="text" 
                    name='customer'
                  /> 
                  
                  <br /><br />

              </div>
              <div className="col">
                <span>Vehicle Plate_no : </span> &nbsp;
                  <input type=" text" 
                    name='plate'
                  />     

              </div>

              <div className="col">
                <span>Invoice Number : </span> &nbsp;
                  <input type="text" 
                  /> 
                  
                  <br /><br />

              </div>


            </div>
          </div>  
        </div>
          <br />
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
                <tr key={index}>
                  <td>
                    <input
                      type='text'
                      className='input-1'
                      value={row.description}
                      name='invDescription'
                      onChange={(e) => {
                        setInvData({ ...invData, [e.target.name]:e.target.value });
                        const newRows = [...rows];
                        newRows[index].description = e.target.value;
                        setRows(newRows);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      className='input-2'
                      value={row.quantity}
                      name='invQuantity'
                      onChange={(e) => {
                        setInvData({ ...invData, [e.target.name]:e.target.value });
                        const newRows = [...rows];
                        newRows[index].quantity = e.target.valueAsNumber;
                        setRows(newRows);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      className='input-2'
                      value={row.unit_price}
                      name='invUnitPrice'
                      onChange={(e) => {
                        setInvData({ ...invData, [e.target.name]:e.target.value });
                        const newRows = [...rows];
                        newRows[index].unit_price = e.target.valueAsNumber;
                        setRows(newRows);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      className='input-2'
                      value={row.amount}
                      name='invAmount'
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='dltbtn' onClick={() => handleDeleteRow(index)}><RiDeleteBinLine/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <button className='addBtn my-3' onClick={handleAddRow}> Add </button>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col">
              <span>Total: </span><input type="number" className='total-input' value={ total } name='invTotal' onChange={handleChange} readOnly/>
            </div>
          </div>
        <button className='savebtn' onClick= {saveinv} ><BiSave/> Save</button>
          

      </div>
      
    </div>


   
    </>
  );
};

export default Inv2;

// code to add and delete row amount value in reduce and splice

  //   const newRows = [...rows];
  //   const deletedRow = newRows.splice(index, 1);
  //   setRows(newRows);
  //   setTotal(total - deletedRow.amount);
  // };

  // const handleAmountChange = (index, amount) => {
  //   const newRows = [...rows];
  //   newRows[index].amount = amount;

  //   const newTotal = newRows.reduce((acc, row) => acc + row.amount, 0);
  //   setRows(newRows);
  //   setTotal(newTotal);
  // };