var router = require('express').Router(),
    rotasApi = require('./rotasApi');

module.exports = function () {
  
  /*
    Quando a url conter prefixo /api direcionar para o modulo de rotas da api
  */
  router.use('/api', rotasApi());

  /*
    Para as demais urls rederizar a index do cliente 
  */
  router.get('/*', function (req, res, next) {
    res.render('index.jade');
  });
  
  return router;
};