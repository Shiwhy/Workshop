// React component (Invoice.js)

import React, { useState } from 'react';
import axios from 'axios';

const Invoice2 = () => {
  const [rows, setRows] = useState([{ description: '', quantity: 0, unit_price: 0, amount: 0 }]);
  const [total, setTotal] = useState(0);

  const handleAddRow = () => {
    setRows([...rows, { description: '', quantity: 0, unit_price: 0, amount: 0 }]);
  };

  const handleDeleteRow = (index) => {
    const deletedRow = rows[index];
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    setTotal(total - deletedRow.amount);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = parseFloat(value) || 0; // Convert value to number, default to 0 if NaN

    if (field === 'amount') {
      const newTotal = newRows.reduce((acc, row) => acc + row.amount, 0);
      setTotal(newTotal);
    }

    setRows(newRows);
  };

  const saveInvoice = async () => {
    try {
      // Extract only the necessary fields for the server (e.g., description, quantity, unit_price, amount)
      const dataToSend = rows.map(({ description, quantity, unit_price, amount }) => ({
        description,
        quantity,
        unit_price,
        amount,
      }));
  
      await axios.post('http://localhost:5001/payment2', { data: dataToSend, total }, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
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
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.unit_price}
                  onChange={(e) => handleInputChange(index, 'unit_price', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.amount}
                  onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
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
        <span>Total: </span>
        <input type="number" value={total} readOnly />
      </div>
      <button onClick={saveInvoice}>Save</button>
    </div>
  );
};

export default Invoice2;
