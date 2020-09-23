const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "Test123",
    database: "app_db",
    port: 3306
});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    //console.log('db ' + connection.state);
});
class DBService {
    static getDBServiceInstance(){
return instance ? instance : new DBService();
    }

async getAllData() {
    try {
        const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
        } )
        //console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async insertNewName(name) {
    try {
        const dateAdded = new Date();
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO names (name, date_added) VALUES (?,?);";
            connection.query(query, [name, dateAdded], (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
            })
            } )
         
           return {
               id : insertId,
               name : name,
               dateAdded : dateAdded
           };

    } catch (error) {
        console.log(error); 
    }
}

async deleteRowById(id) {
    try {
        id = parseInt(id, 10); 
        const response = await new Promise((resolve, reject) => {
            const query = "DELETE FROM names WHERE id = ?";
            connection.query(query, [id], (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
            } )
            return response === 1 ? true : false;
    } catch (error) {
console.log(error)
return false;
    }
   
}
async updateRowById(id, name) {
    try {
        id = parseInt(id, 10); 
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE names SET name = ? WHERE id = ?";
            connection.query(query, [name, id] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
            } );
            return response === 1 ? true : false;
    } catch (error) {
console.log(error)
return false;
    }
   
}
async searchByName(name) {
    try {
        const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names WHERE name = ?;";
        connection.query(query, [name], (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
        } )
        
        return response;
    } catch (error) {
        console.log(error);
    }
}
}
module.exports = DBService;