const utils = require('../services/utils.js');
const { createCustomError } = require('../errors/custom-error.js');

const getRandomJSON = (req, res, next) => {
  const { formattedKeys, schema, limit } = req.query;
  let response = [];
  let _schema = {};
  let statusCode = 200;
  if (formattedKeys) {
    _schema = utils.arrayToObjectKeys(formattedKeys);
  }
  for (let index = 0; index < limit; index++) {
    try {
      if (formattedKeys && formattedKeys.length >= 1) {
        response.push(utils.populateResponseSchema(_schema, index + 1)
        );
      } else {
        _schema = schema ?? 'post';
        const predefinedSchema = utils.predefinedSchema(_schema, index + 1);
        if (!predefinedSchema || Object.keys(predefinedSchema).length === 0) {
          response = { msg: 'The requested schema does not exist.' };
          statusCode = 400;
          break;
        }
        response.push(predefinedSchema);
      }
    } catch (error) {
      return next(createCustomError(error, 400));
    }
  }
  res.status(statusCode).json(response);
};

const getSingleRandomJSON = (req, res, next) => {
  const { formattedKeys, schema } = req.query;
  const { id } = req.params;
  let response = {};
  let _schema = {};
  let statusCode = 200;
  try {
    if (formattedKeys && formattedKeys.length >= 1) {
      _schema = utils.arrayToObjectKeys(formattedKeys);
      response = utils.populateResponseSchema(_schema, id);
    } else {
      _schema = schema ?? 'post';
      const predefinedSchema = utils.predefinedSchema(_schema, id);
      if (!predefinedSchema || Object.keys(predefinedSchema).length === 0) {
        response = { msg: 'The requested schema does not exist.' };
        statusCode = 400;
      } else {
        response = predefinedSchema;
      }
    }
  } catch (error) {
    return next(createCustomError(error, 400));
  }
  res.status(statusCode).json(response);
};

const getWelcome = (req, res) => {
  res.json({ msg: 'Welcome to dynamic json placeholder' });
};

module.exports = { getRandomJSON, getWelcome, getSingleRandomJSON };
