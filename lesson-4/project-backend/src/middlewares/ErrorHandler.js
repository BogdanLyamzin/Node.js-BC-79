import  { HttpError } from 'http-errors';

const ErrorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message || error.name,
    });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const message = isProduction ? 'Some error' : error.message;

  res.status(500).json({
    message,
  });
};

export default ErrorHandler;