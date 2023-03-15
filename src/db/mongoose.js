const mongoose = require('mongoose');

const connection_string = process.env.DB_CONN;

mongoose.connect(connection_string)
.then(() => {
    console.log('connected to database!')
})
.catch(() => {
    console.log("some error occured!")
})