const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config();
require('./src/db/mongoose')


//importing routes
const userRoutes = require('./src/routers/userRoute')

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(userRoutes);

//server configuration
const port = 8000;
const host = 'localhost'

app.listen(port, () => {
    console.log(`server is listening on http://${host}:${port}`);
})
    