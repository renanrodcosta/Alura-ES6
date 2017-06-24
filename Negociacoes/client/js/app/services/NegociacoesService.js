'use strict';

System.register(['./HttpService.js', './ConnectionFactory.js', '../dao/NegociacaoDao.js', '../models/Negociacao.js'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacoesService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpServiceJs) {
            HttpService = _HttpServiceJs.HttpService;
        }, function (_ConnectionFactoryJs) {
            ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
        }, function (_daoNegociacaoDaoJs) {
            NegociacaoDao = _daoNegociacaoDaoJs.NegociacaoDao;
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

            _export('NegociacoesService', NegociacoesService = function () {
                function NegociacoesService() {
                    _classCallCheck(this, NegociacoesService);

                    this._http = new HttpService();
                }

                _createClass(NegociacoesService, [{
                    key: 'obterNegociacoesSemana',
                    value: function obterNegociacoesSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get('negociacoes/semana').then(function (negociacoes) {
                                resolve(negociacoes.map(function (negociacao) {
                                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Não foi possível obter as negociações da semana no servidor");
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoesSemanaAnterior',
                    value: function obterNegociacoesSemanaAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                                resolve(negociacoes.map(function (negociacao) {
                                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Não foi possível obter as negociações da semana no anterior servidor");
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoesSemanaRetrasada',
                    value: function obterNegociacoesSemanaRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                                resolve(negociacoes.map(function (negociacao) {
                                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Não foi possível obter as negociações da semana retrasada no servidor");
                            });
                        });
                    }
                }, {
                    key: 'gravar',
                    value: function gravar(negociacao) {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {
                            _this4._http.post('/negociacoes', negociacao).then(function () {
                                return resolve();
                            }).catch(function (erro) {
                                console.log(erro);
                                reject("Não foi possível gravar a lista de negociações");
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoes',
                    value: function obterNegociacoes() {
                        var _this5 = this;

                        return new Promise(function (resolve, reject) {
                            Promise.all([_this5.obterNegociacoesSemana(), _this5.obterNegociacoesSemanaAnterior(), _this5.obterNegociacoesSemanaRetrasada()]).then(function (negociacoes) {
                                return resolve(negociacoes.reduce(function (arrayAchatado, array) {
                                    return arrayAchatado.concat(array);
                                }, []));
                            }).catch(function (erro) {
                                return reject(erro);
                            });
                        });
                    }
                }, {
                    key: 'cadastra',
                    value: function cadastra(negociacao) {
                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociação cadastrada com sucesso';
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível adicionar a negociação");
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {
                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.listarTodos();
                        }).catch(function (erro) {
                            throw new Error("Não foi possível adicionar a negociação");
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.apagarTodos();
                        }).then(function () {
                            return 'Negociação apagadas com sucesso';
                        }).catch(function (erro) {
                            throw new Error("Não foi possível apagar as negociações");
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(listaNegociacoesExistentes) {
                        return this.obterNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaNegociacoesExistentes.some(function (negociacaoExistente) {
                                    return negociacao.isEquals(negociacaoExistente);
                                });
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível importar a lista de negociações");
                        });
                    }
                }]);

                return NegociacoesService;
            }());

            _export('NegociacoesService', NegociacoesService);
        }
    };
});
//# sourceMappingURL=NegociacoesService.js.map