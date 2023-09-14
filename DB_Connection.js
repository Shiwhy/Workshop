

//Database Connection

const sql = require('mssql');
var sqlConfig = {
  user:"meet",
   password: "meet",
  server: 'DESKTOP-F4QVLAC\\SQLEXPRESS',
  database: "workshop_system",
  // driver: 'msnodesqlv8',
  pool:{
    max:10,
    min:0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true
  }
}

let dbValue = sql.connect(sqlConfig).then(pool => {
  return pool.request().query('select count(*) from customers')
}).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})


module.exports = {
  dbValue
}
