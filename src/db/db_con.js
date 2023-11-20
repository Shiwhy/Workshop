

function verifyLogin(username, password) {
  const sql = require('mssql');
  var sqlConfig = {
    user:"meet",
    password: "meet",
    server: 'DESKTOP-F4QVLAC\\SQLEXPRESS',
    database: "practise",
    driver: 'msnodesqlv8',
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

  let events;
  try {
    events = require('node:events')
  }catch(err){
    console.log(err)
  }

  sql.connect(sqlConfig).then(pool => {
    console.log('database connected')
    return pool.request().query("select count(*) as 'reccount' from login where email='"+username+"' AND password='"+password+"'")
  }).then(result => {
    console.log('return successful')
    var output;
    // var t = JSON.parse(result.recordset[0]);
    result = Object.keys(result.recordset[0]).map(function(k) {
      output = [k, result.recordset[0][k]];
  })
  console.log(output[1])
    return output[1];

  }).catch(err => {
    return err;
  })
}

var res = verifyLogin('akash', '1234');

console.log(res)


// module.exports(
//   verifyLogin
// )