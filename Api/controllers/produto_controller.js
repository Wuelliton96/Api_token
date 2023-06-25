import Produto from "../models/produto_model.js"
import Categoria from "../models/categoria_model.js"
import { where } from "sequelize"

//Buscando a produto pela função findAll
export const getProduto = async (req, res) => {
    try {
        const produto = await Produto.findAll()
        res.send(produto)
    } catch (e) {
        console.log("Erro ao acessar a tabela produto",e)
    }
}

export const getProdutos = async (req, res) => {
  try {
      const produto = await Produto.findAll({where: {
        id_categoria: req.params.cat}
      })
      res.send(produto)
  } catch (e) {
      console.log("Erro ao acessar a tabela produto",e)
  }
}
//Criando a produto pela função create
export const createProduto = async (req, res) => {
    const {id_categoria} = req.body;
    
    try {
      const cateforiaCad =  await Categoria.findByPk(id_categoria);
      
      if (!cateforiaCad){
        throw new Error(`Não há categoria cadastrada com esse codigo ${id_categoria}`);
      }

      await Produto.create(req.body)
      res.json({
        "message":"Um novo registro de produto foi inserido no Banco de dados"
      })
    } 
    catch (e) {
        console.log("Erro ao inserir um produto", e)
    }
}

//atualiza registros da tabela Produto por meio
// da função update
export const updateProduto = async (req, res) => {
  const {id_categoria} = req.body;
  try {
    const categoriaCad =  await Categoria.findByPk(id_categoria);
      
    if (!categoriaCad){
      throw new Error(`Não há categoria cadastrada com esse codigo ${id_categoria}`);
    }

    await Produto.update(req.body, {
      where: {
        cod_produto: req.params.cod
      }
    });

    const {nome_produto, qtd_produto} = req.body
    
    res.json({
      "message": "Produto " + req.params.cod + " foi atualizado para " + nome_produto + " quantidade: " + qtd_produto + " categoria: " + id_categoria +"."
    });
  } catch (e) {
    console.log("Erro ao atualizar a Cadastro Produto", e);
  }
}

  //Deletando o registro da produto pela função destroy
  export const deleteProduto = async (req, res) => {
    try {
      await Produto.destroy({
        where: {
          cod_produto: req.params.cod
        }
      });
      res.json({
        "message": "O Produto " + req.params.cod + " Foi excluído do Banco de Dados"
      });
    } catch (e) {
      console.log("Erro ao excluir registro produto", e);
    }
  }
