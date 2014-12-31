var router = require('express').Router(),
  template = require('./template/templateControlador');

module.exports = function () {

	
    router.get('/', function olaMundo(req, res, next) {
        next('usuario invalido');
    });

  router.use(template());


  router.get('/teste', function (req, res, next) {
    next(new Error('fudeu'));
  });

  return router;
};