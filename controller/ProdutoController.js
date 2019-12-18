const Mongoose = require('mongoose')
const Produto = Mongoose.model('Produto')

class ProdutoController {

  static async buscarProdutos(req, res) {
    try {
      let produtos = await Produto.find({}).populate('setor', 'name ativo').exec()
      console.log(produtos)
      res.json(produtos)
    } catch (error) {
      res.status(500).send(`Erro ao buscar produtos: ${error}`)
    }

  }

  static async buscarProdutosPorSetor(req, res) {
    try {
      let setor = req.body;

      let prod = await Produto.find({
        setor: setor
      });

      res.json(prod);

    } catch (error) {
      res.status(500).send(`Erro ao buscar produtos pelo setor: ${error}`)
    }
  }

  static async adicionarProduto(req, res) {
    try {
      let novoProduto = req.body;
      console.log(novoProduto)
      res.json(await Produto.create(novoProduto))

    } catch (error) {
      res.status(500).send(`Erro ao adicionar produtos: ${error}`)
    }
  }

  static async editar(req, res) {
    try {
      let editarProduto = req.body
      res.json(await Produto.findByIdAndUpdate(editarProduto._id, editarProduto))
    } catch (error) {
      res.status(500).send(`Erro ao editar produtos: ${error}`)
    }
  }

  static async atualizarQuantidade(req, res) {
    try {
      let venda = req.body
      let produtoEstoque = await Produto.find({}).populate('setor', 'name ativo').exec()

      let produtoVenda = await Produto.find({
        _id: venda
      })

      for (let index = 0; index < produtoEstoque.length; index++) {

        if (produtoEstoque[index]._id == produtoVenda) {

          let estoqueAtualizado = (produtoEstoque[index].quantidade - produtoVenda.quantidade)
          produtoEstoque[index].quantidade = estoqueAtualizado

          res.json(await Produto.findByIdAndUpdate(produtoEstoque[i]._id, produtoEstoque))
        }
      }


    } catch (error) {
      res.status(500).send(`Erro ao atualizar quantidade de produtos: ${error}`)
    }


  }

}

module.exports = ProdutoController