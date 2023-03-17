const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const cors = require('cors')
const helmet = require('helmet')

require('dotenv').config();
require('./src/db/mongoose')

//importing routes
const userRoutes = require('./src/routers/userRoute')

const app = express();

/*
* we can configure cors policy using below line, but currently
* i am using same origin policy so no other domain can make request to
* my server, but by cors configuration we can set which domains have allowed
* to make which type of requests [get, post etc.] of my server.
*/

// app.use(cors())


//configuring helmet for security reasons
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"]
        },
    })
)

//configuring rendering engine
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(userRoutes);


//server configuration
const port = 8000;
const host = 'localhost'

app.listen(port, () => {
    console.log(`server is listening on http://${host}:${port}`);
})
