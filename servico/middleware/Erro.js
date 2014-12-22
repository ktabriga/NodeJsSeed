module.exports = function () {

  function tratarErro(erro, req, res, next) {
    console.log(erro);

    res.status(400)
      .json({
        mensagem: erro
      });
  }

  return tratarErro;

};