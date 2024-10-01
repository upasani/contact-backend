const express = require('express');
const connectDB = require('./config/dbconfig');
// import './config/dbconfig'

const app = express();

const dotEnv = require('dotenv').config();

connectDB();
// this is the dotenv package that we can use to getting value from the port directly

const port = process.env.PORT || 5000,
    contactsRoute = require('./routes/contactsRoutes'),
    userRoute = require('./routes/userRoutes');

//instead of define route here we can use the route from the route instead of use route direct here

app.use(express.json()); // we have to use this in order to parse data that comes from the client side (FE)
app.use('/api/contacts', contactsRoute);
app.use('/api/users', userRoute)



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})