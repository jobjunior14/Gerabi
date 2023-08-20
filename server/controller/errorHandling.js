const AppError = require('../utils/appError');

const handleCastErrorDB = err =>
{
    const message = ` Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 404);
};

const handleDuplicateFieldDB = err =>
{
    const message = ` Duplicate:  ${JSON.stringify(err.keyValue).replace(`"`, '')}`;
    return  new AppError(message, 400);
};

const handleValidationErrorDB = (err) =>
{
    const messageErrors = Object.values(err.errors).map(el => el.message )
    console.log(messageErrors);

    const message = ` Validation Error: ${ messageErrors.join(', ')}`;
    return new AppError(message,400);
}

const sendErrorDev = (err, res) =>
{

    res.status(err.statusCode).json(
        {
            status: err.status,
            erro: err,
            message: err.message, 
            stack: err.stack
        }
    );
};

const sendErrorProd = (err, res) =>
{
    //Operational, trusted error: send message to the client
    if (err.isOperational)
    {
        res.status(err.statusCode).json(
            {
                status: err.status,
                message: err.message,
            }
        );
    }

    //Programming  or unknow error: don't lea to the client
    else
    {
        //1) Log the error
        console.error(err, "Error");

        //2) Send the error message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    };
};

module.exports = (err, req, res, next) =>
{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

if ( process.env.NODE_ENV === 'development')
{
    sendErrorDev(err, res);   
}

else if ( process.env.NODE_ENV === 'production')
{
    let error = { ... err};
     
    if (err.name === 'CastError') error = handleCastErrorDB (error);
    if (err.code === 11000) error = handleDuplicateFieldDB (error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB (error);

    sendErrorProd(error, res);
}
}