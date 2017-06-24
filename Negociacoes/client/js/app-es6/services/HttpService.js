class HttpService{

    get(url) {
        return fetch(url)
            .then(response => this._handlerErrors(response))
            .then(response => response.json())
    }

    post(url, dado) {

        return fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res))
    }

    _handlerErrors(response){
        if(response.ok) return response

        throw new Error(response.responseText)
    }
}