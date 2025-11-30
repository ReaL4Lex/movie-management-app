// 404 Not Found handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// General error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
    title: 'Error'
  });
};

module.exports = {
  notFound,
  errorHandler
};
