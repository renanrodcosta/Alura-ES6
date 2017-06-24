export class DataHelper{
    
    constructor(){
        throw new Error("Está classe não pode ser instanciada.")
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }

    static textoParaData(texto){

        let formatoCorreto = !/\d{2}\/\d{2}\/\d{4}/.test(texto)

        if(formatoCorreto) throw new Error('Deve estar no formato dd/mm/aaaa')

        return new Date(...texto.split("/").reverse().map((item, index) => item - index % 2 ))
    }
}