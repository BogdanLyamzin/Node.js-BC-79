import  { HttpError } from 'http-errors';

const ErrorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message || error.name,
    });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const {message, status = 500} = error;
  const errorMessage = isProduction ? 'Some error' : message;
  const errorStatus = isProduction? 500 : status;
  
  res.status(errorStatus).json({
    message: errorMessage,
  });
};

export default ErrorHandler;