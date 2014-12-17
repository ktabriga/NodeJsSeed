var configuracaoPadrao = require('./configuracao/padrao'),
	api = require('./api'),
	aplicacao = require('./biblioteca/aplicacao'),
	http = require('http');

module.exports = function () {
	var app = aplicacao(api);
	
	http.createServer(, configuracaoPadrao.porta, function () {
		console.log("Serviço rodando na porta "+ configuracaoPadrao.porta);
	});
}

