
const express = require('express');
const { ConnectionPool } = require('mssql');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors())

const config = {
  user: 'meet',
  password: 'meet',
  server: 'DESKTOP-F4QVLAC\\SQLEXPRESS',
  database: 'workshop_system',
  options: {
    encrypt: false,
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const pool = new ConnectionPool(config);
pool.connect().then(() => {
  console.log('Connected to SQL Server database');
}).catch((err) => {
  console.error('Error connecting to SQL Server:', err);
});

// ------------------------------ API -----------------------------------------------------


// Vehicle //
app.get('/vehicle', async (req, res) => {
  try{
    const result = await pool.request().query('select * from vehicle');
    res.json(result.recordset)
  } catch(err){
    console.log('error fetching data ',err)
  }
});

app.get('/vehicle/count', async (req, res) => {
  try{
    const result = await pool.request().query('select count(*) as count from vehicle');
    res.json(result.recordset)
  }catch(err){
    console.log('error fetching data',err)
  }
});

app.get('/vehicle/pending/work', async (req, res) => {
  try{
    const result = await pool.request().query('select count(*) as pendingWork from vehicle where vehicle_status = 4;')
    res.json(result.recordset) 
  }catch(err){
    console.log('error fetching data',err)
  }
})

app.get('/vehicle/pending/delivery', async (req, res) => {
  try{
    const result = await pool.request().query('select count(*) as pendingDelivery from vehicle where vehicle_status = 1')
    res.json(result.recordset)
  }catch(err){
    console.log('error fetching data',err)
  }
})


// customer //
app.get('/customer', async (req, res) => {
  try{
    const result = await pool.request().query('select * from customer');
    res.json(result.recordset)
  } catch (err){
    console.log('error fetching data ',err)
  }
});

app.get('/customer/count', async(req,res) => {
  try{
    const result = await pool.request().query('select count(*) as count from customer')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});


// employee //
app.get('/employee', async (req, res) => {
  try {
    const result = await pool.request().query('select * from employee')
    res.json(result.recordset)
  } catch (err) {
    console.log('error fetching data ', err)
    
  }
})

app.get('/employee/count', async(req,res) => {
  try{
    const result = await pool.request().query('select count(*) as count from employee')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});


// Stock //
app.get('/parts', async (req, res) => {
  try{
    const result = await pool.request().query('select * from parts')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/parts/totalStock', async (req, res) => {
  try{
    const result = await pool.request().query('select sum(units) as totalStock from parts')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});


// jobcard //
app.get('/jobcard', async (req, res) => {
  try{
    const result = await pool.request().query('select * from jobcard')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/jobcard/count', async (req, res) => {
  try {
    const result = await pool.request().query('select count(*) as count from jobcard')
    res.json(result.recordset)
  }catch(err) {
    console.log('error fetching data ',err)
  }
});


// payment //
app.get('/payment', async (req, res) => {
  try{
    const result = await pool.request().query('select * from payment')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/payment/pending', async (req, res) => {
  try {
    const result = await pool.request().query('select count(*) as pendingPayment from payment where payment_status = 2;')
    res.json(result.recordset)
  }catch(err) {
    console.log('errror fetching data ',err)
  }
});


// feedback //
app.get('/feedback', async (req, res) => {
  try{
    const result = await pool.request().query('select * from feedback')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/feedback/count', async (req, res) => {
  try {
    const result = await pool.request().query('select count(*) as count from feedback')
    res.json(result.recordset)
  } catch (err) {
    console.log('error fetching data ', err)    
  }
})





app.listen(port,() =>{
  console.log(`server is listening on ${port}`)
})










