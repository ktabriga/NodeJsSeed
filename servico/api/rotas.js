var router = require('express').Router(),
  template = require('./template/templateControlador');

module.exports = function () {
  router.use(template());

  router.get('/teste', function (req, res, next) {
    next(new Error('fudeu'));
  });

  return router;
};