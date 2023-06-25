import { Sequelize } from "sequelize";
import db from "../config/database.js"

const Pedido = db.define('pedido', {
    num_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cod_produto: {
        type:Sequelize.INTEGER
    },
    qtde_pedido: {
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
})
export default Pedido