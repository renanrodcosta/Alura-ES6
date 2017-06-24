"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, NegociacaoController_exercicio_post;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            NegociacaoController_exercicio_post = function () {
                function NegociacaoController_exercicio_post() {
                    _classCallCheck(this, NegociacaoController_exercicio_post);

                    var $ = document.querySelector.bind(document);

                    this._ultimoCriterioOrdem = '';

                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
                }

                _createClass(NegociacaoController_exercicio_post, [{
                    key: "adicionar",
                    value: function adicionar(event) {
                        var _this = this;

                        event.preventDefault();

                        try {
                            var negociacoesService = new NegociacoesService();

                            var negociacao = this._criaNegociacao();

                            negociacoesService.gravar(this._criarModelPost(negociacao)).then(function () {
                                _this._listaNegociacoes.adiciona(negociacao);
                                _this._mensagem.texto = "Negociação incluida com sucesso!";
                                _this._limpaFormulario();
                            }).catch(function (erro) {
                                return _this._mensagem.texto = erro;
                            });
                        } catch (error) {
                            this._mensagem.texto = error;
                        }
                    }
                }, {
                    key: "importar",
                    value: function importar() {
                        var _this2 = this;

                        var negociacoesService = new NegociacoesService();

                        Promise.all([negociacoesService.obterNegociacoesSemana(), negociacoesService.obterNegociacoesSemanaAnterior(), negociacoesService.obterNegociacoesSemanaRetrasada()]).then(function (negociacoes) {
                            negociacoes.reduce(function (arrayAchatado, array) {
                                return arrayAchatado.concat(array);
                            }, []).forEach(function (negociacao) {
                                return _this2._listaNegociacoes.adiciona(negociacao);
                            });
                            _this2._mensagem.texto = "Negociações importadas com sucesso";
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "ordenar",
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
                    key: "apagar",
                    value: function apagar() {
                        this._listaNegociacoes.esvazia();
                        this._mensagem.texto = "Negociações apagadas com sucesso!";
                    }
                }, {
                    key: "_criaNegociacao",
                    value: function _criaNegociacao() {
                        return new Negociacao(DataHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
                    }
                }, {
                    key: "_criarModelPost",
                    value: function _criarModelPost(negociacao) {
                        return {
                            "data": negociacao.data,
                            "quantidade": negociacao.quantidade,
                            "valor": negociacao.valor
                        };
                    }
                }, {
                    key: "_limpaFormulario",
                    value: function _limpaFormulario() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController_exercicio_post;
            }();
        }
    };
});
//# sourceMappingURL=NegociacaoController_exercicio_post.js.map