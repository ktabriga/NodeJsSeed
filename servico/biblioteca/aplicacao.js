var express = require('express'),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  path = require('path');

module.exports = function aplicacao(configuracao, api) {
  var app = module.exports = express();
  var raiz = path.resolve('node_modules').replace('node_modules', '');

  /**
  * Configuração do ambiente
  */
  app.set('porta', process.env.PORT || configuracao.porta);
  app.set('views', path.join(raiz, configuracao.caminhoTemplates) );
  app.set('view engine', 'jade');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));

  var env = process.env.NODE_ENV || 'development';

  app.use(api());

  if (env === 'development') {
    app.use(function (status, req, res, next) {
      console.log(status, next);
      res.send(status);
    });
  }

  if (env === 'production') {
    // TODO
  }


  return app;
}
