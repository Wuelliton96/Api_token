import express from "express"
import cors from "cors"
import db from "./config/database.js"
import categoria_ from "./routers/categoria_routes.js"
import pedido_ from "./routers/pedido_routes.js"
import produto_ from "./routers/produto_routes.js"

import Categoria from "./models/categoria_model.js"
import Pedido from "./models/pedido_model.js"
import Produto from "./models/produto_model.js"

const server = express()
server.use(express.json())
server.use(cors())

try {
    await db.authenticate()
    console.log("Conexão com o MySQl estabelecida!")
} catch (e) {
    console.log("Conexão com o MySQL não etabelecida", e)
}

Pedido.associate = (models) => {
  Pedido.hasMany(models.Produto,
      { foreignKey: 'cod_produto', as: 'produto' }
  )
}

Produto.associate = (models) => {
  Produto.hasMany(models.Categoria,
    {foreignKey: 'id_categoria', as: 'categoria'}  
  )
}

Pedido.belongsTo(Produto, {foreignKey:'cod_produto',allowNull:true})
Produto.belongsTo(Categoria, {foreignKey: 'id_categoria',allowNull:true})

server.use(categoria_)
server.use(pedido_)
server.use(produto_)
server.listen(6100, () => console.log("server executando em http://localhost:6100"))
