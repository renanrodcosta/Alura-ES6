class NegociacaoController{

    constructor() {
        let $ = document.querySelector.bind(document)

        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")

        this._negocioesView = new NegociacoesView($("#negociacoesView"))
        this._mensagemView = new MensagemView($("#mensagemView"))

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), ['adiciona', 'esvazia'], this._negocioesView)

        this._mensagem = new Bind(new Mensagem(), ['texto'], this._mensagemView)
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