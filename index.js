'use strict'

const Express = require('express');
const Cors = require('cors');
const Mongoose = require('mongoose');

const env = process.NODE_ENV || 'development'
const config = require('./config.json')[env]

//Importações dos modelos
const Convidado = require('./model/Convidado')
const Contato = require('./model/Contato')
const Produto = require('./model/Produto')
const Cliente = require('./model/Cliente')
const Usuario = require('./model/Usuario');
const Compra = require("./model/Compra");
const Setor = require("./model/Setor");


class App {

    constructor() {
        this.app;
    }

    //Método para inicializar o objeto do Express
    init() {

        //Instanciar o express
        this.app = Express();

        //Conversor JSON-ObjetoJS
        this.app.use(Express.json())
        this.app.use(Cors())

        //Conectando com o banco mLab
        Mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.url}:${config.db.port}/${config.db.nome}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        //Instanciando os modelos
        new Convidado()
        new Produto()
        new Cliente()
        new Usuario()
        new Compra()
        new Contato()
        new Setor()

        //Importações das rotas
        const ConvidadoRoute = require('./routes/ConvidadosRoute')
        const ContatoRoute = require('./routes/ContatosRoute')
        const ProdutoRoute = require('./routes/ProdutosRoute')
        const CompraRoute = require('./routes/ComprasRoute')
        const UsuarioRoute = require('./routes/UsuariosRoute')
        const ClienteRoute = require('./routes/ClientesRoute')
        const SetorRoute = require('./routes/SetoresRoute')

        //Instanciar a minha rotas
        //Rota de Convidados
        new ConvidadoRoute(this.app)
        new ContatoRoute(this.app)
        new ProdutoRoute(this.app)
        new CompraRoute(this.app)
        new ClienteRoute(this.app)
        new SetorRoute(this.app)
        new UsuarioRoute(this.app)

        //Rota Raíz
        this.app.get('/', function (req, res) {
            res.send('Bem-vindo a API - Smart Market!')
        })

        //Listen
        this.app.listen(process.env.PORT || config.port, () => {
            console.log('API - Smart Market rodando na porta: ' + config.port)
        })

    }
}

new App().init()


//dbuser: t25-smart-market
//dbpassword: t25-ht