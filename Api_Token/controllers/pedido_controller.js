import Pedido from "../models/pedido_model.js"
import Produto from "../models/produto_model.js"

//busca todos os curso registrados na tabela cursp
// por meio do método findAll
export const getPedido = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll()
        res.send(pedidos)
    } catch (e) {
        console.log("Erro ao acessar a tabela Pedidos",e)
    }
}

export const getPedidos = async (req, res) => {
  try {
      const pedidos = await Pedido.findAll({
        where: {
        qtde_pedido: req.params.qtd_pedido}
      })
      res.send(pedidos)
  } catch (e) {
      console.log("Erro ao acessar a tabela Pedidos",e)
  }
}

//Criando o  curso pela função create
export const createPedido = async (req, res) => {
  
  const { cod_produto } = req.body
  try {
    const produtoCad = await Produto.findByPk(cod_produto);

    if (!produtoCad) {
      throw new Error(`Não há produto cadastrado com o código ${cod_produto}`);
    }
  
    let qtde_pedido;

    if(produtoCad.qtd_produto <= 3) {
      qtde_pedido = 4;
    } else if (produtoCad.qtd_produto > 3 && produtoCad.qtd_produto < 7) {
      qtde_pedido = 3;
    } else {
      throw new Error(`Pedido não foi registra pela quatidade do produto que está inválida: ${produtoCad.qtd_produto}`)
    } 

    const { num_pedido } = req.body

    const pedido = {
      num_pedido,
      cod_produto,
      qtde_pedido
    }; 

    await Pedido.create(pedido);
    res.json({
      message: `Um novo pedido no numero ${num_pedido} foi inserido no Banco de dados`
    });
  } catch (e) {
    console.log("Erro ao inserir um novo pedido", e);
  };
}


//atualializando o curso pela função update
export const updatePedido = async (req, res) => {
  const { cod_produto } = req.body

  try {
    const produtoCad = await Produto.findByPk(cod_produto);

    if (!produtoCad) {
      throw new Error(`Não há produto cadastrada com o código ${cod_produto}`);
    }

    let qtde_pedido;

    if(produtoCad.qtd_produto <= 3) {
      qtde_pedido = 4;
    } else if (produtoCad.qtd_produto > 3 && produtoCad.qtd_produto < 7) {
      qtde_pedido = 3;
    } else {
      throw new Error(`Pedido não foi atualizado pela quatidade do produto que está acima: ${produtoCad.qtd_produto}`)
    } 
 
    const pedido = {
      num_pedido,
      cod_produto,
      qtde_pedido
    }
    await Pedido.update(pedido,{
      where: {
        num_pedido: req.params.cod
      }
    });

    res.json({
      "message": "Pedido " + req.params.cod + ", foi atualizado para o produto: " + cod_produto + " quantidade para " + qtde_pedido + "."
    });
  } catch (e) {
    console.error("Erro ao atualiza o cadastro pedido", e);
  };
}

//Deletando registro do curso destroy
export const deletePedido = async (req, res) => {
  try {
    await Pedido.destroy({
      where: {
        num_pedido: req.params.cod
      }
    })
    res.json({
      "message": "O pedido " + req.params.cod + ", foi excluido do banco de dados"
    })
  } catch (e) {
    console.log("Erro ao excluir registro Pedido", e);
  }
}