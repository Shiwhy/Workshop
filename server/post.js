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

    const check= `
      select * from signup where username = '${username}' and email = '${email}';
    `;
    const checkdata = await pool.request().query(check);
    if(checkdata.recordset.length>0) {
      return res.status(400).json({ error: 'user already exist' });
    }

    const insert = `insert into signup (name, username, password, email) values ('${name}', '${username}', '${password}', '${email}')`;
    await pool.request().query(insert);
    res.status(200).json({ message: 'signup successfull'});

  } catch(err) {
    res.status(500).json({ error: 'server error'});
    console.error(err);
  }
});


// app.post('/signup',async (req, res) => {

//   const { name, username, email, password } = req.body;
//   try {
//     await poolConnect;

//     const checkUserQuery = `
//     select * from signup where username = '${username}' and email = '${email}'
//     `;
//     const checkUserResult = await pool.request().query(checkUserQuery);

//     if (checkUserResult.recordset.length > 0) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const query = `
//       insert into signup (name, username, password, email) 
//       values ('${name}', '${username}', '${password}', '${email}')
//     `;
//     await pool.request().query(query);
//     res.status(200).json({ message: 'Signup successfully' });

//   } catch (error) {
//     res.status(500).json({ error: 'Error occurred while signup' });
//     console.error('Error occurred:', error);
//   }
// });





// app.post('/signup',async (req, res) => {

//   const{ name, username, email, password } = req.body;
//   try {
//     await poolConnect;

//     const request = pool.request();
//     request.input('name', sql.VarChar(100), name);
//     request.input('username', sql.VarChar(100), username);
//     request.input('password', sql.NVarChar(100), password);
//     request.input('email', sql.NVarChar(100), email);

//     const query = 'insert into signup (name,username,password,email) values (@name, @username, @password, @email)';
//     await request.query(query);

//     res.status(200).json({ message: 'signup successfully' });

//   } catch (error) {
//     console.error('Error occurred:', error);
//     res.status(500).json({ error: 'error occurred while signup'});
//   }
// });




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
