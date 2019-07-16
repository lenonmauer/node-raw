module.exports = () => (req, res, next) => {
  res.json({ error: '404 - Not Found' });
};
