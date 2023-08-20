const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config ({ path: 'config.env'});

process.on ( 'uncaughtException', err =>
{
    console.log ('uncaught exception shutting down ...' );
    console.log (err.message, err.name, err.stack);
    process.exit (1);
});

mongoose.connect ( process.env.DATABASE_LOCAL, {
    })
    .then (() => { console.log ( 'DB connection established');})
    .catch (err => console.log ('DB connection error: ' + err));

const port =  5000 || process.env.PORT

const server = app.listen(port, () =>
{
    console.log (`app listening on port ${ port}`);
});

process.on('unhandledRejection', err =>
{
    console.log (err.name, err.message);

    server.close( () =>
    {
        process.exit(1);
    });
});


