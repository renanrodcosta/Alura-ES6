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

        this._service = new NegociacoesService()

        this._init()
    }

    adicionar(event){
        event.preventDefault()  

         let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem; 
                this._limpaFormulario();  
            }).catch(erro => this._mensagem.texto = erro);                
    }

    importar(){
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
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
        this._service.apaga()
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

    _init(){
        this._service
            .lista()
            .then(negociacoes => 
                        negociacoes.forEach(negociacao => 
                            this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro)
        
        setInterval(() => {
            this.importar()
        }, 3000)
    }
}