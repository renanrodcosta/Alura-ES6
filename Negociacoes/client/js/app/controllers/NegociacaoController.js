class NegociacaoController{

    constructor() {
        let $ = document.querySelector.bind(document)

        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")
        
        this._listaNegociacoes = ProxyFactory.criar(
            new ListaNegociacoes(),
            ['adiciona', 'esvazia'],
            model => this._negocioesView.update(model))

        this._mensagem = ProxyFactory.criar(
            new Mensagem(),
            ['texto'],
            model => this._mensagemView.update(model))
        
        this._negocioesView = new NegociacoesView($("#negociacoesView"))
        this._mensagemView = new MensagemView($("#mensagemView"))

        this._negocioesView.update(this._listaNegociacoes)
        this._mensagemView.update(this._mensagem)
    }

    adicionar(event){
        event.preventDefault()    
        this._listaNegociacoes.adiciona(this._criaNegociacao())        
        this._mensagem.texto = "Negociação incluida com sucesso!" 
        this._limpaFormulario()
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

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}