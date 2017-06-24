class NegociacoesService{

    constructor(){
        this._http = new HttpService()
    }

    obterNegociacoesSemana() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
                })
                .catch(erro => {
                    console.log(erro)
                    reject("Não foi possível obter as negociações da semana no servidor")
                })
        })
    }

    obterNegociacoesSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
                })
                .catch(erro => {
                    console.log(erro)
                    reject("Não foi possível obter as negociações da semana no anterior servidor")
                })
        })
    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
                })
                .catch(erro => {
                    console.log(erro)
                    reject("Não foi possível obter as negociações da semana retrasada no servidor")
                })
        })
    }

    gravar(negociacao){
        return new Promise((resolve, reject) => {
            this._http.post('/negociacoes', negociacao)
                .then(() => resolve())
                .catch(erro => {
                    console.log(erro)
                    reject("Não foi possível gravar a lista de negociações")
                })
        })
    }

    obterNegociacoes(){
        return new Promise((resolve, reject) => {
            Promise.all([   
                this.obterNegociacoesSemana(), 
                this.obterNegociacoesSemanaAnterior(), 
                this.obterNegociacoesSemanaRetrasada()])
            .then(negociacoes =>   
                resolve(negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])))
            .catch(erro => reject(erro))
        })
    }

    cadastra(negociacao) {
         return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação cadastrada com sucesso')
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível adicionar a negociação")
            });
    }   

    lista(){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.listarTodos())
            .catch(erro => {
                throw new Error("Não foi possível adicionar a negociação")
            });
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.apagarTodos())
            .then(() => 'Negociação apagadas com sucesso')
            .catch(erro => {
                throw new Error("Não foi possível apagar as negociações")
            });
    }

    importa(listaNegociacoesExistentes){
        return this.obterNegociacoes()
            .then(negociacoes => 
                    negociacoes.filter(negociacao => 
                        !listaNegociacoesExistentes.some(negociacaoExistente => 
                            negociacao.isEquals(negociacaoExistente))))
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível importar a lista de negociações")
            })
    }
}