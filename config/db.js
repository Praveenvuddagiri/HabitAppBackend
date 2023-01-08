const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const connectWithDb = async() =>{

    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.DB_URL, {
    
        useUnifiedTopology: true,
    
        useNewUrlParser: true,
    
    }).then(console.log('connect sucess to mongodb'))
}

module.exports = connectWithDb;