const express = require('express');
const { router, testRouter } = require('./routes/route.js');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { createCustomError } = require('./errors/custom-error.js');
const configureHeader = require('./middleware/configure-header');
const { getWelcome } = require('./controllers/logics');
const helmet = require('helmet');
require('dotenv').config();
const app = express();
const debug = require('debug')('app');

const PORT = process.env.PORT || '3000';
const DEFAULT_LIMIT = parseInt(process.env.DEFAULT_LIMIT) || 10;
const MAX_LIMIT = parseInt(process.env.MAX_LIMIT) || 100;
const RUNNING_LOCAL = process.env.RUNNING_LOCAL === '0';
app.use(helmet());

app.use(express.json());

app.set('json spaces', 2);

app.use((req, res, next) => {
  const { keys } = req.query;
  debug(req.method + ' ' + req.url);
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

app.get('/', (req, res) => getWelcome(req, res));
app.use('/api', router);
if (RUNNING_LOCAL || app.get('env') === 'test') {
  app.use('/api/test', testRouter);
}
app.use(notFound);
app.use(errorHandlerMiddleware);

const server = app.listen(PORT, () => {
  debug(`Application running on port ${PORT}`);
});

module.exports = { app, server, DEFAULT_LIMIT };
