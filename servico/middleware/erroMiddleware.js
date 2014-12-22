module.exports = function () {

  function tratarErro(erro, req, res, next) {
    console.log(erro.stack);
    console.log(erro.message);

    res.status(400)
      .json({
        mensagem: erro.message
      });
  }

  return tratarErro;

};