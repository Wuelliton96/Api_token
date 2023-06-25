import Categoria from "../models/categoria_model.js"

//busca todos os professores registrados na tabela professor
// por meio do método findAll
export const getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findAll()
        res.send(categoria)
    } catch (e) {
        console.log("Erro ao acessar a tabela Categoria",e)
    }
}

// inseri registros na tabela professor por meio do 
//método create
export const createCategoria = async (req, res) => {
    try {
        await Categoria.create(req.body)
        res.json({
            "message":"Um novo registro de categoria foi inserido no Banco de dados"
        })
    } 
    catch (e) {
        console.log("Erro ao Inserir um novo Categoria", e)
    }
}

//atualiza registros da tabela professor por meio
// da função update
export const updateCategoria = async (req, res) => {
  try {
    await Categoria.update(req.body, {
      where: {
        id_categoria: req.params.id
      }
    });
    
    const {nome_categoria} = req.body

    res.json({
      "message": "Categoria " + req.params.id + " foi atualizado para " + nome_categoria +"."
    });
  } catch (e) {
    console.log("Erro ao atualizar o cadastro Categoria", e);
  }
}

//Deletando a categoria
export const deleteCategoria = async (req, res) => {
  try {
    await Categoria.destroy({
      where: {
        id_categoria: req.params.id
      }
    });
    res.json({
      "message": "A categoria " + req.params.id + " Foi excluído do Banco de Dados"
    });
  } catch (e) {
    console.log("Erro ao excluir registro da categoria", e);
  }
}
