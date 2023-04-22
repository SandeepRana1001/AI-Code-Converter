const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const errorHandler = require('./utils/errorHandler');
const ApiError = require('./utils/APIError')
const route = require('./routes/index.router')

// creating app
const app = express()

app.use(helmet())

// Middleware to catch the incoming request
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

// enable cors
app.use(cors());
app.options("*", cors());

app.use('/api', route)


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    throw new ApiError(404, "Not found");
});

app.use(errorHandler)

module.exports = app

