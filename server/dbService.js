const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "Test123",
    database: "app_db",
    port: 3306
});
console.log('/hi', process.env)
connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
})
