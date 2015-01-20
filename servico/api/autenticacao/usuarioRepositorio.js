'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  q = require('Q');

module.exports = Repositorio;

var UsuarioSchema = Schema({
  nome: {
    type: String,
    required: 'nome.obrigagatorio',
    trim: true
  },

  senha: {
    type: String,
    required: 'senha.obrigagatorio'
  },

  email: {
    type: String,
    required: 'email.obrigatorio',
    trim: true,
    unique: true
  },

  privilegio: {
    type: String,
    enum: ['USUARIO','ADMINISTRADOR'],
    default: 'USER'
  },

  linguagem: {
    type: String,
    enum: ['PT-BR', 'US-EN', 'ES-ES'],
    default: 'US-EN'
  }
});

UsuarioSchema.pre('save', function (next) {
  this.senha = passwordHash.generate(this.senha);
  next();
});

var Usuario = mongoose.model('Usuario', UsuarioSchema);

function Repositorio() {
  this. buscarUsuarioPorEmail= buscarUsuarioPorEmail;

  function buscarUsuarioPorEmail(email) {
    var diferir = q.defer(),
      consulta = {
        email: email
      };

    Usuario.findOne(consulta, function (erro, usuario) {
      if (erro) {
        return diferir.reject(erro);
      }

      diferir.resolve(usuario);
    });

    return diferir.promise;
  }

}
