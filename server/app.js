const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const dbService = require('./dbService.js');


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


//create
app.post('/insert', (request, response) => {

});

//read
app.get('/getAll', (request, response) => { 

response.json({
    success: true
})
});

//update


//delete

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => console.log('app is running', PORT));