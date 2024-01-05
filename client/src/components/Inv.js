import React, { useState } from 'react';
import '../css/inv.css';
import axios from 'axios';

const Inv = () => {
  const [rows, setRows] = useState([{ description: '', quantity: 0, unit_price: 0, amount: 0 }]);
  const [total, setTotal] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleAddRow = () => {
    setRows([...rows, { description: '', quantity: 0, unit_price: 0, amount: 0 }]);
  };

  const saveinv = async () => {
    try {
      await axios.post('http://localhost:5001/payment3', { rows, total, customerName, invoiceNo, vehicleNumber }, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    let deletedRow;

    for (let i = 0; i < rows.length; i++) {
      if (i === index) {
        deletedRow = rows[i];
        continue;
      }
      newRows.push({ ...rows[i] });
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

  return (
    <div>
      <div>
        <label>Customer name:</label>
        <input type='text' value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <label>Invoice no:</label>
        <input type='text' value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
        <label>Vehicle number_plate:</label>
        <input type='text' value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>unit_price</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type='text'
                  value={row.description}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].description = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.quantity}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].quantity = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.unit_price}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].unit_price = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>
              <td>
                <input
                  type='number'
                  name='invAmount'
                  value={row.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>
      <div>
        <label>Total:</label>
        <input type='text' name='invTotal' value={total} readOnly />
      </div>
      <button onClick={saveinv}>Save</button>
    </div>
  );
};

export default Inv;
