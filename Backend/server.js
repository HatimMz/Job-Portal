const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
require("dotenv").config();

const app = express();


app.use(express.json()); 
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const connectdb = require("./config/db");
connectdb();


const jobRoutes = require('./routes/jobRoutes');

app.use('/jobs', jobRoutes);



const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log(`Server started`);
});