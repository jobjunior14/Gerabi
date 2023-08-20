const express = require('express');
const morgan = require('morgan');
const AppError =  require(`${__dirname}/./utils/appError`);
const globalErrorHandler = require(`${__dirname}/./controller/errorHandling`);
const app = express();

//First Middleware
app.use(express.json());

app.use (morgan('dev'));

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const bralimaRouter = require('./routes/main_routes.js');

//3) Routes
app.use ('/api/v1', bralimaRouter);

app.all ('*', (req, res, next) =>
{
    next( new AppError (`Cannot find ${req.originalUrl} this server`, 404));
});

app.use( globalErrorHandler );


module.exports = app;