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

}