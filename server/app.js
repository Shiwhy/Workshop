
const express = require('express')
const { ConnectionPool }  = require('mssql');
const app = express();
const cors = require('cors')
const port = 5000;

app.use(cors());

const config = {
  user: 'workshop',
  password: 'workshop',
  server: 'DESKTOP-BJT7PNS',
  database: 'workshop_system',
  options: {
    encrypt: false
  }
}
const pool = new ConnectionPool(config);

pool.connect().then(() => {
  console.log('Connected to database');
}).catch ((err) => {
  console.log('Error connecting DB', err)
});

// Customer
app.get('/customer', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from customer')
    res.json(result.recordset)
  } 
  catch(err) {
    console.log('Error in fetching', err);
  }
});

app.get('/customerStatus', async(req, res) => {
  try {
    const result = await pool.request().query('select * from customer_status')
    res.json(result.recordset)
  } 
  catch (err) {
    console.log("Error in fetching", err)
  }
});

app.get('/countCustomer', async(req, res) => {
  try {
    const result = await pool.request().query('select count(*) as count from customer')
    res.json(result.recordset)
  } 
  catch (err) {
    console.log("Error in fetching", err)
  }
});


// Vehicle
app.get('/vehicle', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from vehicle')
    res.json(result.recordset)
  } catch (err) {
    console.log("Error in fetching ", err)
  }
});

app.get('/vehicleStatus', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from vehicle_status')
    res.json(result.recordset)
  } catch (err) {
    console.log("Error in fetching ", err)
  }
});

app.get('/vehicleCompany', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from vehicle_company')
    res.json(result.recordset)
  } catch (err) {
    console.log("Error in fetching ", err)
  }
});

app.get('/countVehicle', async(req, res) => {
  try {
    const result = await pool.request().query('Select count(*) as count from vehicle')
    res.json(result.recordset)
  } catch (err) {
    console.log("Error in fetching ", err)
  }
});


// Employee
app.get('/employee', async(req, res) => {
  try {
    const result = await pool.request().query('select * from employee')
    res.json(result.recordset)
  } catch (err) {
    console.log("Error in fetching ", err)
  }
});

app.get('/countEmployee', async(req, res) => {
  try {
    const result = await pool.request().query('select count(*) as count from employee')
    res.json(result.recordset)
  } catch (err) {
    console.log("Error in fetching ", err)
  }
});

// Jobcard
app.get('/jobcard', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from jobcard')
    res.json(result.recordset)
  } 
  catch (err) {
    console.log("Error in fetching ", err)
  }
});

app.get('/jobcardStatus', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from jobcard_status')
    res.json(result.recordset)
  } catch (err) {
    console.log("Error in fetching ", err)
  }
});


// Fuel
app.get('/fuel', async(req, res) => {
  try {
    const result = await pool.request().query('select * from fuel')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});


// Complains
app.get('/complains', async(req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM complains')
    res.json(result.recordset);
  }
  catch(err){
    console.log("Error in fetching", err)
  }
});

app.get('/complainStatus', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from complain_status')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});

// Estimate
app.get('/estimate', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from estimate')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});


// Payment
app.get('/payment', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from payment')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});

app.get('/paymentStatus', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from payment_status')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});

app.get('/invoiceStatus', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from invoice_status')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});


// Parts
app.get('/parts', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from parts')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});


// Feedback
app.get('/feedback', async(req, res) => {
  try {
    const result = await pool.request().query('Select * from feedback')
    res.json(result.recordset)
  }
  catch(err) {
    console.log("Error in fetching ", err)
  }
});


app.listen(port, () => {
  console.log('Server is running on port 5000');
})


module.exports = { config };