angular.module('app').filter("asRole", [function () {
  return function (input) {
    switch (input) {
      case 'contributor': return 'Colaborador'; break;
      case 'committee': return 'Comissão'; break;
      case 'directorship': return 'Diretoria'; break;
      default: return 'Anônimo';
    }
  }
}])