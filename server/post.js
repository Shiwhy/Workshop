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

app.post('/forgetPassword', async (req, res) => {
  await poolConnect;

  const { forgUsername, forgPassword } = req.body;

  const forgetPasswordQuery = `
    update signup
    set password = '${forgPassword}'
    where username = '${forgUsername}'
  `;
  await pool.request().query(forgetPasswordQuery);
  res.status(200).json({ message: 'Password Changed Successfully' })
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
      name, contact, email, address, custStatus, empid,
      vehType, fuel, company, model, plate, kms, vehicleStatus,serviceDate, 
      complains, reqService, compStatus, 
      paymentStatus, paymentMethod, amount, 
      parts, jobcardStatus,
      invPrice, invAmount, invQuantity, invParts
    } = req.body;

    const customer = `
      insert into customer ( customer_name, contact, Address, email, customer_status )
      output inserted.customer_id
      values ( '${name}', '${contact}', '${address}', '${email}', '${custStatus}' );
    `;
    const customerResult = await pool.request().query(customer);
    const customer_id = customerResult.recordset[0].customer_id;
    
    const vehicle = `
      insert into vehicle ( vehicle_type, fuel_type, company, vehicle_model, registration_no, KMs, customer_id, vehicle_status ) 
      output inserted.vehicle_id
      values ( '${vehType}', '${fuel}', '${company}', '${model}', '${plate}', '${kms}', '${customer_id}','${vehicleStatus}' );
    `;
    const vehicleResult = await pool.request().query(vehicle);
    const vehicle_id = vehicleResult.recordset[0].vehicle_id;

    const estDate = `
      insert into estimate ( est_date ) 
      output inserted.est_id
      values( '${serviceDate}' );
    `;
    const estResult = await pool.request().query(estDate);
    const est_id = estResult.recordset[0].est_id;

    const complain = ` 
      insert into complains ( complain, complain_status, vehicle_id, requested_service, required_parts )
      output inserted.complain_id
      values ( '${complains}', '${compStatus}', '${vehicle_id}','${reqService}', '${parts}' );
    `;
    const complainResult = await pool.request().query(complain);
    const complain_id = complainResult.recordset[0].complain_id;

    const payment = `
      insert into payment ( payment_status, payment_type, amount, customer_id, vehicle_id )
      output inserted.payment_id
      values ( '${paymentStatus}', '${paymentMethod}', '${amount}', '${customer_id}', '${vehicle_id}' );
    `;
    const paymentResult = await pool.request().query(payment);
    const payment_id = paymentResult.recordset[0].payment_id;

    const jobcard = `
      insert into jobcard (jobcard_date, jobcard_status, customer_id, employee_id, vehicle_id, complain_id, payment_id)
      output inserted.jobcard_id
      values( FORMAT (getdate(), 'dd-MM-yy'), '${jobcardStatus}', '${customer_id}', '${empid}', '${vehicle_id}', '${complain_id}', '${payment_id}')
    `;
    const jobcardResult = await pool.request().query(jobcard);
    const jobcard_id = jobcardResult.recordset[0].jobcard_id;


    // jobcrd_id into estimate table 
    const updateEst = `
      update estimate 
      set jobcard_id = '${jobcard_id}' 
      where est_id = '${est_id}'
    `;
    await pool.request().query(updateEst);

    res.status(200).json({ message:'Jobcard added' })


  }catch(err){
    console.log(err)
  }
});

app.post('/payment', async(req, res) => {
  try{ 
    await poolConnect;
    const { invDescription, invQuantity, invUnitPrice, invAmount, invTotal } = req.body;

    const invoiceQuery = `
      insert into invoice ( description, qunatity, unit_price, amount, total )
      values ( '${invDescription}', '${invQuantity}', '${invUnitPrice}', '${invAmount}', '${invTotal}' );
    `;

    await pool.request().query(invoiceQuery);

  }catch(err){
    console.log(err)
  }
});



// fetching employee data in jobcard
app.post('/jobcard/employee', async(req,res) => {
  try{
    await poolConnect;

    const { empid } = req.body; 

    const query = `
      select emp_name, contact from employee where emp_id = '${empid}';
    `;

    const result = await pool.request().query(query);

    const { emp_name, contact } = result.recordset[0];

    if (result.recordset[0]) {
      res.json({
        empName: emp_name,
        empContact: contact,
      });
      // res.status(200).json({ message: `Employee fetched.` })
    } else  {
      console.log(res.status);
      res.status(401).json({ message: `Employee doesn't exist.` })
    }

  }catch(err){
    console.log(err)
    return res.status(500).json({ message: `server error`})
  }
});



// add employee 
app.post('/addemp', async (req,res) => {
  await poolConnect;
  const { e_name, e_email, e_contact, e_address, e_salary, e_bank_acc, e_designation } = req.body;

  const query = `
    insert into employee ( emp_name, contact, address, salary, email, bank_acc, designation )
    values( '${e_name}', '${e_contact}', '${e_address}', '${e_salary}', '${e_email}', '${e_bank_acc}', '${e_designation}' );
  `;
  await pool.request().query(query)
  res.status(200).json({ message: 'Data Added Succesfully' });
});


//add part
app.post('/addpart', async (req,res) => {
  await poolConnect;
  const{ partname, partprice, partunit } = req.body;

  const query = `
    insert into parts ( part_name, price, units ) 
    values ('${partname}', ' ${partprice}', '${partunit}')
  `;
  await pool.request().query(query)
  res.status(200).json({ message: 'Data Added Succesfully' });

});

//add part units into databse
app.post('/addPartUnit', async(req, res) => {
  await poolConnect;
  const{ addunit, partName } = req.body;

  const query = `
    update parts
    set units = '${addunit}'
    where part_name = '${partName}'
  `;
  // await pool.request().query(query)
  await pool.request()
      .input('addunit', sql.Int, addunit) // Specify the SQL data type as Int
      .input('partName', sql.VarChar, partName) // Assuming partName is of type VARCHAR
      .query(query);
})


//searchbar
app.post('/search', async (req,res) => {
  try {
    
    await poolConnect;
    const{ searchEmp, searchVehicle, searchCustomer, searchJobcard } = req.body;
  
    
    if(searchEmp) {
      const query = `
        select * from employee where emp_name = '${searchEmp}' or designation='${searchEmp}';
      `;
      const result = await pool.request().query(query)
      res.json(result.recordset);

    } 
    else if (searchVehicle) {
      const searchVehicleQuery = ` 
        select vehicle.*,
          customer.customer_name ,
          vehicle_company.company_name,
          fuel.fuel_name,
          vehicle_status.value
        from vehicle 
        join customer on customer.customer_id = vehicle.customer_id
        join vehicle_company on vehicle_company.company_id = vehicle.company
        join fuel on fuel.fuel_id = vehicle.fuel_type
        join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status
        where registration_no ='${searchVehicle}' or customer_name='${searchVehicle}' or 
              vehicle_type = '${searchVehicle}' or company_name = '${searchVehicle}' or
              vehicle_model = '${searchVehicle}' or fuel_name = '${searchVehicle}' or
              vehicle_status.value = '${searchVehicle}' 
      `;
      const vehicleResult = await pool.request().query(searchVehicleQuery);
      res.json(vehicleResult.recordset)
    }
    else if (searchCustomer) {
      const searchCustomerQuery = `
        select customer.*,
          vehicle.vehicle_model,
          vehicle.registration_no,
          vehicle_status.value
        from customer
        join vehicle on vehicle.vehicle_id = customer.customer_id
        join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status 
        where customer_name = '${searchCustomer}'
      `;
      const customerResult = await pool.request().query(searchCustomerQuery)
      res.json(customerResult.recordset)
    } 
    else if (searchJobcard) {
      const searchJobcardQuery = `
        select jobcard.jobcard_id,
          jobcard.jobcard_date, 
          jobcard_status.value as jobcardStatus,
          customer.customer_name,
          employee.emp_name,
          vehicle.vehicle_model,
          vehicle.registration_no,
          complains.complain,
          payment.amount,
          payment_status.value as paymentStatus,
          payment.invoice_name,
          payment.invoice_date,
          estimate.est_date
        from jobcard
        join jobcard_status on jobcard_status.status_id = jobcard.jobcard_status
        join customer on customer.customer_id = jobcard.customer_id
        join employee on employee.emp_id = jobcard.employee_id
        join vehicle on vehicle.vehicle_id = jobcard.vehicle_id
        join complains on complains.complain_id = jobcard.complain_id
        join payment on payment.payment_id = jobcard.payment_id
        join estimate on estimate.jobcard_id = jobcard.jobcard_id
        join payment_status on payment_status.status_id = payment.payment_status 
        where customer_name = '${searchJobcard}' or emp_name = '${searchJobcard}' or
              registration_no = '${searchJobcard}' or jobcard_date = '${searchJobcard}'
      `;
      const jobcardResult = await pool.request().query(searchJobcardQuery)
      res.json(jobcardResult.recordset)
    }

  } catch (err) {
    console.log(err)
    
  }
});


app.post('/payment2', async (req, res) => {
  try {
    const { data, total } = req.body;

    // Assuming you have a 'invoices' table with columns: description, quantity, unit_price, amount, total
    for (const row of data) {
      const { description, quantity, unit_price, amount } = row;

      const invoiceQuery = `
        INSERT INTO invoice (description, quantity, unit_price, amount, total)
        VALUES ('${description}', ${quantity}, ${unit_price}, ${amount}, ${total});
      `;

      await pool.request().query(invoiceQuery);
    }

    res.status(200).send('Invoice data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/payment3', async (req, res) => {
  try {
    var conn = await poolConnect;
    if(conn === 'connected') {
      console.log(conn)
    } 
    
    const { rows, total } = req.body;

    var Pid = `
      select max(Payment_ID) as payment_id from payment;
    `;
    const paymentRes = await pool.request().query(Pid)
    const paymentqueryResult = paymentRes.recordset[0].payment_id;


    var Invid = `
      select max(invoice_no)+1 as invoice_no from payment;
    `;
    const invoiceRes = await pool.request().query(Invid)
    const invqueryResult = invoiceRes.recordset[0].invoice_no;

    console.log(paymentqueryResult)
    console.log(invqueryResult)

    const invUpdate = `
      update payment
      set invoice_no = '${invqueryResult}'
      where payment_id = '${paymentqueryResult}'
    `;
    const invUpdateResult = await pool.request().query(invUpdate);

    const descQuery = `
      select invoice_no as invoice_no from payment
      where payment_id = '${paymentqueryResult}'
    `;
    const descQueryResult = await pool.request().query(descQuery);
    const descQueryRecord = descQueryResult.recordset[0].invoice_no
    console.log(descQueryRecord);

    // console.log(desc)
    // await pool.request().query(desc)



    for (const row of rows) {
      await pool.request().query(`
        insert into description ( description, quantity, unit_Price, amount, total, invoice_no )
        VALUES ('${row.description}', '${row.quantity}', '${row.unit_price}', '${row.amount}', '${total}', '${descQueryRecord}');
      `);
    }

    // Respond with success
    res.status(200).json({ message: 'Invoice data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// app.post('/payment', async (req, res) => {
//   try {
//     // Extracting data from the request body
//     const { invDescription, invQuantity, invUnitPrice, invAmount, invTotal } = req.body;

//     // Create a connection pool
//     const pool = await sql.connect(config);

//     // Insert invoice data into the database
//     const query = `
//       INSERT INTO InvoiceTable (Description, Quantity, UnitPrice, Amount, total)
//       VALUES ('${invDescription}', ${invQuantity}, ${invUnitPrice}, ${invAmount}, ${invTotal});
//     `;

//     await pool.request().query(query);

//     // Respond with success
//     res.status(200).json({ message: 'Invoice data saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
