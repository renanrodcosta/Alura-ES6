class NegociacoesService{

    obterNegociacoesSemana() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', '/negociacoes/semana')

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {            
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                                    .map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
                    } else {                    
                        console.log(xhr.responseText)   
                        reject("Não foi possível obter as negociações da semana no servidor")                 
                    }
                }
            }       
            xhr.send()
        })
    }

    obterNegociacoesSemanaAnterior() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', '/negociacoes/anterior')

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {            
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                                    .map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
                    } else {                    
                        console.log(xhr.responseText)   
                        reject("Não foi possível obter as negociações da semana no anterior servidor")                 
                    }
                }
            }       
            xhr.send()
        })
    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', '/negociacoes/retrasada')

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {            
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                                    .map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
                    } else {                    
                        console.log(xhr.responseText)   
                        reject("Não foi possível obter as negociações da semana retrasada no servidor")                 
                    }
                }
            }       
            xhr.send()
        })
    }

}