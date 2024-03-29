'use strict'
const Mongoose = require('mongoose')
const Cliente = Mongoose.model('Cliente')

let clientes = []
let cont = 3

class ClienteController {

    static async buscarTodos(req, res) {
        try {
            res.json(await Cliente.find({}))
        } catch (error) {
            res.status(500).send(`Erro ao buscar clientes: ${error}`)
        }
    }

    static async buscarClientePorUsuario(req, res) {
        try {
            let objUsuario = req.body
            console.log("Objeto parametro da busca de cliente por usuario: " + JSON.stringify(objUsuario))
            res.json(await Cliente.find(objUsuario));
        } catch (error) {
            res.status(500).send(`Erro ao logar no sistema: ${error}`)
        }
    }

    static async adicionar(req, res) {
        try {
            let clienteNovo = req.body
            res.json(await Cliente.create(clienteNovo))
            console.log(req.body)   

        } catch (error) {
            res.status(500).send(`Erro ao salvar cliente: ${error}`)
        }
    }

    static async editar(req, res) {
        try {
            let clienteEdicao = req.body
            res.status(200).json(await Cliente.findByIdAndUpdate(clienteEdicao._id, clienteEdicao))
        } catch (error) {
            res.status(500).send(`Erro ao editar o cliente: ${error}`)
        }

    }


}
module.exports = ClienteController