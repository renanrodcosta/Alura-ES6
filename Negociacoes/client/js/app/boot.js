'use strict';

System.register(['./controllers/NegociacaoController.js', './pollyfill/fetch.js'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoControllerJs) {
      NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
    }, function (_pollyfillFetchJs) {}],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.adicionar.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apagar.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map