module.exports = function (err, req, res, next) {
  console.error(err.stack || err.message);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Server Error' : err.message;
  res.status(status).json({ message });
};
