class DataHelper{
    
    constructor(){
        throw new Error("Está classe não pode ser instanciada.")
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }

    static textoParaData(texto){

        let formatoCorreto = !/\d{4}-\d{2}-\d{2}/.test(texto)

        if(formatoCorreto) throw new Error("Deve estar no formato aaaa-mm-dd.")

        return new Date(...texto.split("-").map((item, index) => item - index % 2 ))
    }
}