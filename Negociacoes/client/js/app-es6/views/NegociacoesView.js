import {View} from './View.js'
import {DataHelper} from '../helpers/DataHelper.js'

export class NegociacoesView  extends View {

    constructor(elemento){
        super(elemento)
    }

    template(model){
        return `<table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negociacaoController.ordenar('data')">DATA</th>
                <th onclick="negociacaoController.ordenar('quantidade')">QUANTIDADE</th>
                <th onclick="negociacaoController.ordenar('valor')">VALOR</th>
                <th onclick="negociacaoController.ordenar('volume')">VOLUME</th>
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
            <td colspan="3"></td>
            <td>
                ${model.negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0.0)}
            </td>
        </tfoot>
    </table>`
    }
}