var router = require('express').Router();

module.exports = function () {
	
	router.get('/', function olaMundo(req, res) {
		res.send('olaMundo');
	});

	return router;
};