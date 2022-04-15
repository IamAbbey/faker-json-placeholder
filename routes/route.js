const express = require('express');

const router = express.Router();
const testRouter = express.Router();

const {
  getRandomJSON,
  getWelcome,
  getSingleRandomJSON
} = require('../controllers/logics');

router.route('/').get(getWelcome);
router.route('/welcome').get(getWelcome);
router.route('/faker').get(getRandomJSON);
router.route('/faker/:id').get(getSingleRandomJSON);

testRouter.route('/500').get((res, req) => {
  throw new Error('intentional');
});

module.exports = { router, testRouter };
