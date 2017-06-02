class Bind{
    constructor(model, props, view) {
        let proxy = ProxyFactory.criar(model, props, model => view.update(model))

        view.update(model)
        return proxy
    }
}