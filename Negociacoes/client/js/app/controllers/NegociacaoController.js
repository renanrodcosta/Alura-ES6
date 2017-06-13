class NegociacaoController{

    constructor() {
        let $ = document.querySelector.bind(document)

        this._ultimoCriterioOrdem = ''

        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
                                          new NegociacoesView($("#negociacoesView")), 
                                          'adiciona', 'esvazia', 'ordena', 'inverteOrdem')

        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto')

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .then(negociacoes => 
                        negociacoes.forEach(negociacao => 
                            this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro)
    }

    adicionar(event){
        event.preventDefault()  

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao()

                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao)
                        this._mensagem.texto = "Negociação incluida com sucesso!"
                        this._limpaFormulario()
                    })
            })       
            .catch(erro => this._mensagem.texto = erro)                    
    }

    importar(){
        let negociacoesService = new NegociacoesService()

        Promise.all([   
            negociacoesService.obterNegociacoesSemana(), 
            negociacoesService.obterNegociacoesSemanaAnterior(), 
            negociacoesService.obterNegociacoesSemanaRetrasada()])
        .then(negociacoes => {  
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = "Negociações importadas com sucesso"
        })
        .catch(erro => this._mensagem.texto = erro)
    }

    ordenar(coluna){
        if(coluna == this._ultimoCriterioOrdem){
            this._listaNegociacoes.inverteOrdem()
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna])
        }
        this._ultimoCriterioOrdem = coluna
    }

    apagar(){
        console.log('apagar')
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodos())
            .then(mensagem => {
                this._listaNegociacoes.esvazia()
                this._mensagem.texto = mensagem
            })
            .catch(erro => this._mensagem.texto = erro)
    }

    _criaNegociacao(){
        return new Negociacao(DataHelper.textoParaData(this._inputData.value),
                                        parseInt(this._inputQuantidade.value),
                                        parseFloat(this._inputValor.value))
    }

    _criarModelPost(negociacao){
        return {
            "data" : negociacao.data,
            "quantidade" : negociacao.quantidade,
            "valor" : negociacao.valor
        }
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}