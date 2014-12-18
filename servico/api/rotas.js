var router = require('express').Router();

module.exports = function () {
	
	router.get('/', function olaMundo(req, res, next) {
		next('usuario invalido');
	});

	return router;
};