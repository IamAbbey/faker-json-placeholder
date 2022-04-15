const configureHeader = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Strict-Transport-Security', 'max-age=63072000');
  res.setHeader('Content-Type', 'application/json');

  next();
};

module.exports = configureHeader;
