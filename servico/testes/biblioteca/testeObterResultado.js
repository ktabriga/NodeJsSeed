var resposta = require('../../biblioteca/obterResultado');
var expect = require('expect.js');

describe('Tratar resultados', function () {

  it('obter resultado de uma busca', function (done) {
    //simula o próximo middleware a ser executado
    function next(erro) {
      done('erro');
    }

    var buscarPessoa = resposta.obterResultado(next,
      function (resultado) {
        expect(resultado).to.exist;
        done();
      });

    buscarPessoa(undefined, {});

  });

  it('tratar erro', function (done) {

    //simular proximo middleare a ser executado, no caso é criado uma funão para teste
    function next(erro) {
      expect(erro).to.be.a('object');
      done();
    }

    var buscarPessoa = resposta.obterResultado(next,
      function (resultado) {
        done('resultado não deveria ocorrer');
      });

    buscarPessoa(new Error('Erro ao realizar busca'), undefined);
  });

});