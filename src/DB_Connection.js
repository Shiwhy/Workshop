

//Database Connection

const sql = require('mssql');
var sqlConfig = {
  user:"meet",
   password: "meet",
  server: 'DESKTOP-F4QVLAC\\SQLEXPRESS',
  database: "practise",
  // driver: 'msnodesqlv8',
  pool:{
    max:10,
    min:0,
    idleTimeoutMillis: 300000
  },
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true
  }
}

sql.connect(sqlConfig).then(pool => {
  return pool.request().query('select * from login')
}).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});