class NegociacoesService{

    obterNegociacoesSemana(callback){
        let xhr = new XMLHttpRequest()
        xhr.open('GET', '/negociacoes/semana')

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {            
                if(xhr.status == 200) {
                    callback(null, JSON.parse(xhr.responseText)
                                .map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
                    
                } else {                    
                    console.log(xhr.responseText)   
                    callback("Não foi possível obter as negociações do servidor", null)                 
                }
            }
        }       
        xhr.send()
    }

}