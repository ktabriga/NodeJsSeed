var router = require('express').Router(),
  template = require('./template/templateControlador');

module.exports = function () {

	
    router.get('/', function olaMundo(req, res, next) {
        next('usuario invalido');
    });

  router.use(template());


  return router;
};