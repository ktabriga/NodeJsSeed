var usuarioRepositorio = require("./usuarioRepositorio"),
  UsuarioServico = require("./usuarioServico"),
  router = require("express").Router();

module.exports = function (configuracao) {
  var servico = new UsuarioServico(configuracao);

  function autenticar(req, res, next) {
    var dadosUsuario = req.body;

    usuarioRepositorio.buscarUsuarioPorEmail(dadosUsuario.email)
      .then(verificar);

    function verificar(usuario) {

      if (usuarioServico.validarSenha(usuario)) {
        var token = usuarioServico.gerarToken(usuario);
        return res.json({
          token: token
        });
      }

      next(Error("usuario.invalido"));
    }
  }
};



