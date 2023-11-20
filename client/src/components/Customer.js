import React from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Customer = () => {

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/customers'); // Replace with your API endpoint
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    <h1>Customer List</h1>
      <ul>
        {customerData.map(customer => (
          <li key={customer.customer_id}>{customer.customer_id}</li>
        ))}
      </ul>
    </>
  )
}

export default Customer;
