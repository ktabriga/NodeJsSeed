var passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken');

module.exports = function (configuracao) {
  this.gerarToken = gerarToken;
  this.validarSenha = validarSenha;

  function gerarToken(usuario) {
    var usuarioCopia = {
      nome: usuario.nome,
      email: usuario.email,
      linguagem: usuario.linguagem,
      privilegio: usuario.privilegio
    };

    var token = jwt.sign(usuarioCopia, configuracao.segredo, {
      expiteInMinutes: 60 *5
    });

    return token;
  }

  function validarSenha(senha, senhaInformada) {
    return passwordHash.verify(senhaInformada, senha);
  }

};



