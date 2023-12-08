
const express = require('express');
const { ConnectionPool } = require('mssql');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


// ------------------------------ API -----------------------------------------------------

// Vehicle //
app.get('/vehicle', async (req, res) => {
  try{
    // const result = await pool.request().query('select * from vehicle');
    const query = `
      select vehicle.vehicle_id,
          vehicle.vehicle_type,
          vehicle_company.company_name,
          vehicle.vehicle_model,
          fuel.fuel_name,
          vehicle.registration_no,
          vehicle.KMs,
          customer.customer_name,
          vehicle_status.value
      from vehicle 
      join vehicle_company on vehicle.company = vehicle_company.company_id
      join fuel on vehicle.fuel_type = fuel.fuel_id
      join customer on vehicle.customer_id = customer.customer_id
      join vehicle_status on vehicle.vehicle_status = vehicle_status.status_id
    `;
    const result = await pool.request().query(query)
     
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

app.get('/vehicle/pending/delivery/count', async (req, res) => {
  try{
    const result = await pool.request().query('select count(*) as pendingDelivery from vehicle where vehicle_status = 1')
    res.json(result.recordset)
  }catch(err){
    console.log('error fetching data',err)
  }
})

app.get('/vehicle/pending/delivery', async (req,res) => {
  try {
    const query = `
      select vehicle.vehicle_id,
        vehicle.vehicle_type,
        vehicle_company.company_name,
        vehicle.vehicle_model,
        fuel.fuel_name,
        vehicle.registration_no,
        vehicle.KMs,
        customer.customer_name,
        vehicle_status.value
      from vehicle 
      join vehicle_company on vehicle.company = vehicle_company.company_id
      join fuel on vehicle.fuel_type = fuel.fuel_id
      join customer on vehicle.customer_id = customer.customer_id
      join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status
      where vehicle_status = 1;
    `;
    const result = await pool.request().query(query)
    res.json(result.recordset)
  }catch(err){
    console.log('error fetching data',err)
  }

})

app.get('/vehicle/pending/getwork', async (req,res) => {
  try {
    const query = `      
      select vehicle.vehicle_id,
        vehicle.vehicle_type,
        vehicle_company.company_name,
        vehicle.vehicle_model,
        fuel.fuel_name,
        vehicle.registration_no,
        vehicle.KMs,
        customer.customer_name,
        vehicle_status.value
      from vehicle 
      join vehicle_company on vehicle.company = vehicle_company.company_id
      join fuel on vehicle.fuel_type = fuel.fuel_id
      join customer on vehicle.customer_id = customer.customer_id
      join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status
      where (vehicle_status = 2 or vehicle_status = 4);
    `;
    const result = await pool.request().query(query)
    res.json(result.recordset)
  }catch(err) {
    console.log('error fetching data ', err);
  }
});

// customer //
app.get('/customer', async (req, res) => {
  try{
    const query = `
      select customer.customer_id,
        customer.customer_name,
        customer.contact,
        customer.Address,
        customer.email,
        customer_status.value,
        vehicle.registration_no,
        vehicle.vehicle_model
      from customer 
      join customer_status on customer.customer_status = customer_status.status_id
      join vehicle on vehicle.vehicle_id = customer.customer_id
    `;
    const result = await pool.request().query(query);
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
});

app.get('/employee/count', async(req,res) => {
  try{
    const result = await pool.request().query('select count(*) as count from employee')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

// fetching employee detail in jobcard
// app.get('/jobcard/emp/data', async (req, res) => {
//   try {
//     // await pool.connect(config);
//     const { empid } = req.body;
//     const query = `
//       select emp_name, contact from employee where emp_id = 1 
//     `;
//     const result = await pool.request().query(query);
//     res.json(result.recordset);

//   } catch (err) {
//       console.log(err)
//   }
// })


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
    const query = `
      select jobcard.jobcard_id,
        jobcard.jobcard_date,
        jobcard_status.value as jobcardStatus,
        customer.customer_name,
        employee.emp_name,
        vehicle.vehicle_model,
        complains.complain,
        parts.part_name,
        payment_status.value,
        payment.invoice_no,
        vehicle.registration_no
      from jobcard
      join jobcard_status on jobcard_status.status_id = jobcard.jobcard_status
      join customer on customer.customer_id = jobcard.customer_id
      join employee on employee.emp_id = jobcard.employee_id
      join vehicle on vehicle.vehicle_id = jobcard.vehicle_id
      join complains on complains.complain_id = jobcard.complain_id
      join parts on parts.part_id = jobcard.part_id
      join payment on payment.payment_id = jobcard.payment_id
      join payment_status on payment_status.status_id = jobcard.payment_id
    `;
    const result = await pool.request().query(query)
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
    const query = `
      select payment.payment_id,
        payment_status.value, 
        payment.payment_type, 
        payment.amount,
        payment.bank_acc,
        payment.ack_no,
        payment.payment_date,
        payment.invoice_id,
        payment.invoice_name,
        payment.invoice_no,
        invoice_status.inv_value, 
        customer.customer_name, 
        vehicle.vehicle_model 
      from payment
      join payment_status on payment_status.status_id = payment.payment_status
      join invoice_status on invoice_status.status_id = payment.invoice_status
      join customer on customer.customer_id = payment.customer_id
      join vehicle on vehicle.vehicle_id = payment.vehicle_id
    `;
    const result = await pool.request().query(query)
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
    const query = `
      select feedback.feedback_id,
        customer.customer_name,
        feedback.feedback,
        customer.email
      from feedback
      join customer on customer.customer_id = feedback.customer_id;
    `;
    const result = await pool.request().query(query)
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
});

// login //

app.get('/login', async (req, res) => {
  try {
    const result = await pool.request().query('select * from login')
    res.json(result.recordset)
  } catch (err) {
    console.log('error fetching data ', err)    
  }
});

app.get('/empid', async (req, res) => {
  try {
    const employee = `
      select * from employee
    `;
    const empResult = await pool.request().query(employee)
    res.json(empResult.recordset[0].emp_id)    
  } catch (err) {
    console.log(err)
  }
});







app.listen(port,() =>{
  console.log(`server is listening on ${port}`)
})










