const ProdutoController = require('./../controller/ProdutoController')

class ProdutoRoute {

  constructor(app) {

    app.route('/produtos')
      .get(ProdutoController.buscarProdutos)
      .post(ProdutoController.adicionarProduto)
      .put(ProdutoController.editar)

    //Rota para buscar produtos por setores  
    app.route('/produtos/setor')
      .post(ProdutoController.buscarProdutosPorSetor)

    //Rota para atualizar quantidade de produtos no estoque  
    app.route("/produtos/estoqueatualizado")
      .put(ProdutoController.atualizarQuantidade)


  }

}
module.exports = ProdutoRoute