import {currentInstance} from './controllers/NegociacaoController.js'
import {} from './pollyfill/fetch.js'

let negociacaoController = currentInstance()

document.querySelector('.form').onsubmit = negociacaoController.adicionar.bind(negociacaoController)
document.querySelector('[type=button]').onclick = negociacaoController.apagar.bind(negociacaoController)
