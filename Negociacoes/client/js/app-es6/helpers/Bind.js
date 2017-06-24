import {ProxyFactory} from '../services/ProxyFactory.js'

export class Bind{
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.criar(model, props, model => view.update(model))

        view.update(model)
        return proxy
    }
}