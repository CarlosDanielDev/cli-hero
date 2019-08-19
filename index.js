const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")
        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar um Heroi")
        .option('-r, --remover [value]', "Remover um Heroi pelo id")
        .option('-a, --atualizar [value]', "Atualizar um Heroi pelo id")
        .parse(process.argv)
    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('Heroi nã foi cadastrado')
                return
            }
            console.log('Heroi Cadastrado com Sucesso')
        }
        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return
        }
        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Não foi possovel remover o heroi')
                return
            }
            console.log('Heroi Removido com sucesso')
        }
        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar)
            // remover todas as chaves com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado){
                console.error('Não foi possível Atualizar o Heroi!')
                return
            }
            console.log('Heroi atualizado com sucesso')
            // delete heroi.id

        }
    } catch (e) {
        console.error('deu ruim', e)
    }
}
main()