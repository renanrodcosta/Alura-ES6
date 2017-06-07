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
    }

    adicionar(event){
        event.preventDefault()  

        try {
            let negociacoesService = new NegociacoesService()

            let negociacao = this._criaNegociacao()

            negociacoesService.gravar(this._criarModelPost(negociacao))
                .then(() => {
                    this._listaNegociacoes.adiciona(negociacao)
                    this._mensagem.texto = "Negociação incluida com sucesso!"
                    this._limpaFormulario()
                })  
                .catch(erro => this._mensagem.texto = erro)
        } catch (error) {
            this._mensagem.texto = error
        }                       
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
        this._listaNegociacoes.esvazia()
        this._mensagem.texto = "Negociações apagadas com sucesso!"
    }

    _criaNegociacao(){
        return new Negociacao(DataHelper.textoParaData(this._inputData.value),
                                        this._inputQuantidade.value,
                                        this._inputValor.value)
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