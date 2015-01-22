var router = require('express').Router(),
    template = require('./template/templateControlador'),
    autenticacao = require('./autenticacao/usuarioControlador');

module.exports = function () {

  router.use(template());
  router.use("/autenticacao", autenticacao());

  return router;
};