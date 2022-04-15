const notFound = (req, res) =>
  res.status(404).json({ error: 'Route does not exist' });

module.exports = notFound;
