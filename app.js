const express = require('express');
const { router, testRouter } = require('./routes/route.js');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { createCustomError } = require('./errors/custom-error.js');
const configureHeader = require('./middleware/configure-header');
require('dotenv').config();

const PORT = process.env.PORT || '3000';
const DEFAULT_LIMIT = parseInt(process.env.DEFAULT_LIMIT) || 10;
const MAX_LIMIT = parseInt(process.env.MAX_LIMIT) || 100;
const DEBUG = process.env.DEBUG === '0';

app.use(express.json());

app.set('json spaces', 2);

app.use((req, res, next) => {
  const { keys } = req.query;
  req.query.formattedKeys = keys?.split(',');
  req.query.limit = req.query.limit ?? DEFAULT_LIMIT;
  if (req.query.limit > MAX_LIMIT) {
    return next(
      createCustomError(
        `Maximum limit at the moment is ${MAX_LIMIT} got ${req.query.limit}`,
        400
      )
    );
  }
  next();
});
app.use(configureHeader);

app.use('/api', router);
if (DEBUG || app.get('env') === 'test') {
  app.use('/api/test', testRouter);
}
app.use(notFound);
app.use(errorHandlerMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

module.exports = { app, server, DEFAULT_LIMIT };
