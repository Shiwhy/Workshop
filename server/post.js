const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const axios = require('axios')

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

// var url = 'http://localhost:5001/login'
app.post('/login', async (req, res) => {
  try {
    await poolConnect;

    const { username, password } = req.body;

    const request = pool.request();
    request.input('username', sql.NVarChar(100), username);
    request.input('password', sql.NVarChar(100), password);

    const query = 'insert into login (username, password) values (@username, @password)';
    await request.query(query);

    res.status(200).json({ message: 'Login successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'error occurred while login' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
