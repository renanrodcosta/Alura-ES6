class NegociacaoController{

    constructor() {
        let $ = document.querySelector.bind(document)

        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")
        
        this._listaNegociacoes = new ListaNegociacoes()
        this._mensagem = new Mensagem()
        
        this._negocioesView = new NegociacoesView($("#negociacoesView"))
        this._mensagemView = new MensagemView($("#mensagemView"))

        this._negocioesView.update(this._listaNegociacoes)
    }

    adicionar(event){
        event.preventDefault()    

        let negociacao = new Negociacao(DataHelper.textoParaData(this._inputData.value),
                                        this._inputQuantidade.value,
                                        this._inputValor.value)

        this._listaNegociacoes.adiciona(this._criaNegociacao())
        this._negocioesView.update(this._listaNegociacoes)
        
        this._mensagem.texto = "Negociação incluida com sucesso!"        
        this._mensagemView.update(this._mensagem)

        this._limpaFormulario()
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