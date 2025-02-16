const statusCodes = require('./statusCodes');

const errorMessages = {
  NOT_FOUND: 'The requested resource was not found.',
  BAD_REQUEST: 'Invalid input data. Please check your request.',
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later.',
};

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error stack trace for debugging

  const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
  const message = process.env.NODE_ENV === 'development' ? err.message : errorMessages[statusCode];

  // Prepare the error response
  const errorResponse = {
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err.stack : {},
  };

  // Send the response
  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;