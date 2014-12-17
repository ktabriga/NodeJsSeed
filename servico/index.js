var configuracaoPadrao = require('./configuracao/padrao'),
	api = require('./api'),
	aplicacao = require('./biblioteca/aplicacao'),
	bancoDados = requrie('./biblioteca/conexaoMongo');

module.exports = function () {
	bancoDados(configuracaoPadrao);
	var app = aplicacao(api);	
};

