var router = require('express').Router(),
  template = require('./template/templateControlador');

module.exports = function () {
  router.use(template());


  return router;
};