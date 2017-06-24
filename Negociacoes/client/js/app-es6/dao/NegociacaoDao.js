class NegociacaoDao {
    constructor(connection){
        this._connection = connection
        this._store = 'negociacoes'
    }

    adiciona(negociacao){
        return new Promise((resolve, reject) => {

            let request = this._connection
                    .transaction([this._store], 'readwrite')
                    .objectStore(this._store)
                    .add(negociacao)

            request.onsuccess = e => {
                resolve()
            }

            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível adicionar negociação')
            }

        })
    }

    listarTodos(){
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor()

            let negociacoes = []

            cursor.onsuccess = event => {
                let resultSet = event.target.result
                
                if (resultSet) {
                    let registro = resultSet.value

                    negociacoes.push(new Negociacao(registro._data, registro._quantidade, registro._valor))
                    resultSet.continue()
                } else {
                    resolve(negociacoes)
                }
            }
            cursor.onerror = event => {
                console.log(event.target.error)
                reject('Não foi possível listar as negociações');
            }
        })
    }

    apagarTodos(){
        return new Promise((resolve, reject) => {
            let request = this._connection
                    .transaction([this._store], 'readwrite')
                    .objectStore(this._store)
                    .clear()

            request.onsuccess = () => resolve('Negociações apagas com sucesso')

            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível apagar as negociações')
            }

        })
    }
}