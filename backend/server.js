const express = require('express');
const cors = require('cors');
const ConnectDB = require('./config/db');
const app = express();
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());

ConnectDB();



app.listen(PORT, ()=> { 
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
});