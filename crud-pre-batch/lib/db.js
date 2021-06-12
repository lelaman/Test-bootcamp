const mysql = require("mysql")
const connection =mysql.createConnection({
    host:"localhost",
    user :"root",
    password :null,
    database:"datacourse",
});

connection.connect((error) => {
 if(error) {
     console.log(error);
 } else {
     console.log("connected...");
 }
});

module.exports = connection;