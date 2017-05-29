class NegociacaoController{

    constructor() {
        let $ = document.querySelector.bind(document)

        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")
    }

    adicionar(event){
        event.preventDefault()    

        let dataHelper = new DataHelper()
        let negociacao = new Negociacao(dataHelper.textoParaData(this._inputData.value),
                                        this._inputQuantidade.value,
                                        this._inputValor.value)

        console.log(negociacao)
        console.log(dataHelper.dataParaTexto(negociacao.data))
    }
}