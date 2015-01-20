var usuarioRepositorio = require("./usuarioRepositorio"),
  usuarioServico = require("./usuarioServico"),
  router = require("express").Router();

module.exports = function (configuracao) {

  function autenticar(req, res, next) {
    var dadosUsuario = req.body;

    usuarioRepositorio.buscarUsuarioPorEmail(dadosUsuario.email)
      .then(verificar);

    function verificar(usuario) {

      if (usuarioServico.validarSenha(usuario)) {
        var token = usuarioServico.gerarToken(usuario, configuracao);
        return res.json({
          token: token
        });
      }

      next(Error("usuario.invalido"));
    }
  }


  router.post("autenticacao", autenticar);
};



