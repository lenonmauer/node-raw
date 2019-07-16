module.exports = () => (err, req, res) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || '500 - Internal Server Error';

  res.status(status).json({ error: message });
};
