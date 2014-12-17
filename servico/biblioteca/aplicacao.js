var express = require('express'),
  bodyParser = require('body-parser'),
  errorHandler = require('error-handler'),
  morgan = require('morgan'),
  path = require('path');

function configuracaoExpress(configuracao, api) {
  var app = module.exports = express();
  var raiz = path.resolve(__dirname).split('/node_modules')[0];

  /**
  * Configuração do ambiente
  */
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(raiz, configuracao.caminhoTemplates) );
  app.set('view engine', 'jade');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(express.static(path.join(__dirname, 'public')));

  var env = process.env.NODE_ENV || 'development';

  app.use(api());

  if (env === 'development') {
    app.use(express.errorHandler());
  }

  if (env === 'production') {
    // TODO
  }


  return app;
}
