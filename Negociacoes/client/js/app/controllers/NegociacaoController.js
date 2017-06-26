'use strict';

System.register(['../models/ListaNegociacoes.js', '../models/Mensagem.js', '../views/NegociacoesView.js', '../views/MensagemView.js', '../services/NegociacoesService.js', '../helpers/DataHelper.js', '../helpers/Bind.js', '../models/Negociacao.js'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacoesService, DataHelper, Bind, Negociacao, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoesJs) {
            ListaNegociacoes = _modelsListaNegociacoesJs.ListaNegociacoes;
        }, function (_modelsMensagemJs) {
            Mensagem = _modelsMensagemJs.Mensagem;
        }, function (_viewsNegociacoesViewJs) {
            NegociacoesView = _viewsNegociacoesViewJs.NegociacoesView;
        }, function (_viewsMensagemViewJs) {
            MensagemView = _viewsMensagemViewJs.MensagemView;
        }, function (_servicesNegociacoesServiceJs) {
            NegociacoesService = _servicesNegociacoesServiceJs.NegociacoesService;
        }, function (_helpersDataHelperJs) {
            DataHelper = _helpersDataHelperJs.DataHelper;
        }, function (_helpersBindJs) {
            Bind = _helpersBindJs.Bind;
        }, function (_modelsNegociacaoJs) {
            Negociacao = _modelsNegociacaoJs.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

                    this._ultimoCriterioOrdem = '';

                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');

                    this._service = new NegociacoesService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: 'adicionar',
                    value: function adicionar(event) {
                        var _this = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this._listaNegociacoes.adiciona(negociacao);
                            _this._mensagem.texto = mensagem;
                            _this._limpaFormulario();
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importar',
                    value: function importar() {
                        var _this2 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this2._listaNegociacoes.adiciona(negociacao);
                            });
                            _this2._mensagem.texto = "Negociações importadas com sucesso";
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'ordenar',
                    value: function ordenar(coluna) {
                        if (coluna == this._ultimoCriterioOrdem) {
                            this._listaNegociacoes.inverteOrdem();
                        } else {
                            this._listaNegociacoes.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }
                        this._ultimoCriterioOrdem = coluna;
                    }
                }, {
                    key: 'apagar',
                    value: function apagar() {
                        var _this3 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this3._listaNegociacoes.esvazia();
                            _this3._mensagem.texto = mensagem;
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DataHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_criarModelPost',
                    value: function _criarModelPost(negociacao) {
                        return {
                            "data": negociacao.data,
                            "quantidade": negociacao.quantidade,
                            "valor": negociacao.valor
                        };
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }, {
                    key: '_init',
                    value: function _init() {
                        var _this4 = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this4._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            _this4.importar();
                        }, 3000);
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {
                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map