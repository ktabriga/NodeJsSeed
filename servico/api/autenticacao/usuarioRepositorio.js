'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passwordHash = require('password-hash');

var UsuarioSchema = Schema({
  nome: {
    type: String,
    default: 'nome.nome',
    unique: true,
    trim: true
  },

  senha: {
    type: String,
    default: 'senha.obrigagatorio'
  },

  email: {
    type: String,
    required: 'email.obrigatorio',
    trim: true
  },
  role: {
    type: String,
    enum: ['USUARIO','ADMINISTRADOR'],
    default: 'USER'
  },

  linguage: {
    type: String,
    enum: ['PT-BR', 'US-EN', 'ES-ES'],
    default: 'US-EN'
  }
});

UsuarioSchema.pre('save', function (next) {
  this.senha = passwordHash.generate(this.senha);
  next();
});

UsuarioSchema.statics.autenticar = function (dadosUsuario, sucessoCallback, erroCallback) {
  console.log(dadosUsuario);

  var consulta = {
    name: dadosUsuario.name
  };

  this.findOne(consulta, function (erro, usuario) {
    if (erro) {
      return erroCallback(erro);
    }

    if(!usuario || !senhaValida(dadosUsuario.password)) {
      return erroCallback(new Error('invalid password'));
    }

    sucessoCallback(usuario);
  });
};

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;

function  criarUsuarioPadrao() {
  var dadosUsuario = {
      nome: 'admin',
      senha: '1',
      email: 'mentor@gmail.com'
    },
    query = {nome: 'admin'},
    self = this;

  Usuario.findOne(query, function (err, user) {
    if (err) {
      console.log(err);
    }

    if (user) {
      console.log('admin user found');
      return;
    }

    new self(dadosUsuario).save();
    console.log('admin user created');
  });

};

function senhaValida (senha) {
  return passwordHash.verify(senha, this.senha);
}
