const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const PORT = 5001;

const config = {
  user:"meet",
  password: "meet",
  server: 'DESKTOP-F4QVLAC\\SQLEXPRESS',
  database: "workshop_system",
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect().then(console.log('connected'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())



// login //

app.post('/login', async (req, res) => {
  try {
    await poolConnect;

    const { username, password } = req.body;

    const query = `
      select count(*) as count from signup where username='${username}' and password='${password}';
    `;
    const result = await pool.request().query(query);

    // authentication
    const user = result.recordset[0].count;
    if(user === 1){
      res.status(200).json({message: 'login succesfully'})
    }else{
      res.status(401).json({message: 'invalid username and password'})
    }

    // res.status(200).json({ message: 'Login successfully' });

  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'error occurred while login' });
  }
});


app.post('/signup', async (req,res) => {
  try{
    await poolConnect;
    
    const { username, name, password, email } = req.body;

    // authentication             
    const check= `
      select * from signup where username = '${username}' and email = '${email}';
    `;
    const checkdata = await pool.request().query(check);
    if(checkdata.recordset.length>0) {
      return res.status(400).json({ error: 'user already exist' });
    }

    // insert after authentication success
    const insert = `insert into signup (name, username, password, email) values ('${name}', '${username}', '${password}', '${email}')`;
    await pool.request().query(insert);
    res.status(200).json({ message: 'signup successfull'});

  } catch(err) {
    res.status(500).json({ error: 'server error'});
    console.error(err);
  }
});

app.post('/jobcard', async (req,res) => {
  try{
    await poolConnect;

    const { 
      name, contact, email, address, custStatus, 
      vehType, fuel, company, model, plate, kms,
      empid
    } = req.body;

    const customer = `
      insert into customer ( customer_name, contact, Address, email, customer_status )
      output inserted.customer_id
      values ( '${name}', '${contact}', '${address}', '${email}', '${custStatus}' );
    `;
    
    const customerResult = await pool.request().query(customer);
    const customer_id = customerResult.recordset[0].customer_id;
    
    const vehicle = `
      insert into vehicle ( vehicle_type, fuel_type, company, vehicle_model, registration_no, KMs, customer_id ) 
      output inserted.vehicle_id
      values ( '${vehType}', '${fuel}', '${company}', '${model}', '${plate}', '${kms}', '${customer_id}' );
    `;
    await pool.request().query(vehicle);
   
  }catch(err){
    console.log(err)
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
