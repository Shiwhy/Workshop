


const sql = require("msnodesqlv8");
const connectionString = "server=DESKTOP-F4QVLAC; Database=practise; Trusted_Connection=Yes; Driver={msnodesqlv8}";
const query = "Select * from login";

sql.query(connectionString, query, (err, rows) => {
  console.log(rows);
});