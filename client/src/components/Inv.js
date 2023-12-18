import React, { useState } from 'react';
import '../css/inv.css'

const Inv = () => {
  const [rows, setRows] = useState([{ description: '', quantity: 0, parts: 0, amount: 0 }]);
  const [total, setTotal] = useState(0);

  const handleAddRow = () => {
    setRows([...rows, { description: '', quantity: 0, parts: 0, amount: 0 }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    const deletedRow = newRows.splice(index, 1)[0];
    setRows(newRows);
    setTotal(total - deletedRow.amount);
  };

  const handleAmountChange = (index, amount) => {
    const newRows = [...rows];
    newRows[index].amount = amount;

    const newTotal = newRows.reduce((acc, row) => acc + row.amount, 0);
    setRows(newRows);
    setTotal(newTotal);
  };

  return (
    <div>
      <div>
        <label>Customer name:</label>
        <input type='text' />
        <label>Invoice no:</label>
        <input type='text' />
        <label>Vehicle number_plate:</label>
        <input type='text' />
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Parts</th>
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
                    newRows[index].quantity = e.target.valueAsNumber;
                    setRows(newRows);
                  }}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.parts}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].parts = e.target.valueAsNumber;
                    setRows(newRows);
                  }}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.amount}
                  onChange={(e) => handleAmountChange(index, e.target.valueAsNumber)}
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
        <input type='text' value={total} readOnly />
      </div>
    </div>
  );
};

export default Inv;