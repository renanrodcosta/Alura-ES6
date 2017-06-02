class NegociacaoController{

    constructor() {
        let $ = document.querySelector.bind(document)

        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia')

        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($("#mensagemView")), 'texto')
    }

    adicionar(event){
        event.preventDefault()    
        this._listaNegociacoes.adiciona(this._criaNegociacao())        
        this._mensagem.texto = "Negociação incluida com sucesso!" 
        this._limpaFormulario()
    }

    importar(){
        let xhr = new XMLHttpRequest()
        xhr.open('GET', '/negociacoes/semana')

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){            
                if(xhr.status == 200){                    
                    let negociacoes = JSON.parse(xhr.responseText)

                    negociacoes.map(negociacao => this._listaNegociacoes.adiciona(
                        new Negociacao(
                            new Date(negociacao.data), 
                            negociacao.quantidade, 
                            negociacao.valor)))

                    this._mensagem.texto = "Importação efetuada com sucesso"
                }else{
                    this._mensagem.texto = "Não foi possível recuperar as informações do servidor"
                    console.log(xhr.responseText)                    
                }
            }
        }       
        xhr.send()
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