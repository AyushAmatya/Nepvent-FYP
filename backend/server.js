const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require('./config/db')

const app = express();

app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
}
next();
});
require('dotenv').config({
    path: './config/config.env'
});

// Connect to database
connectDB();

// body parser
app.use(express.json());

// Load routes
const authRouter = require('./routes/auth.route')
const eventRouter = require('./routes/event.route')

// Use Routes
app.use('/api', authRouter)
app.use('/event', eventRouter)

// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});