class NegociacoesView{

    constructor(elemento){
        this._elemento = elemento
    }

    update(model){
        this._elemento.innerHTML = this._template(model)
    }

    _template(model){
        return `<table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        <tbody>
            ${model.negociacoes.map(negociacao => `
                <tr>
                    <td>${DataHelper.dataParaTexto(negociacao.data)}</td>
                    <td>${negociacao.quantidade}</td>
                    <td>${negociacao.valor}</td>
                    <td>${negociacao.volume}</td>
                </tr>
            `).join('')}
        </tbody>
        <tfoot>
        </tfoot>
    </table>`
    }
}