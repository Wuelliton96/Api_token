import { Sequelize } from "sequelize";
import db from "../config/database.js"

const Produto = db.define('produto', {
    cod_produto: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome_produto: {
        type:Sequelize.STRING(50)
    },
    qtd_produto: {
        type:Sequelize.INTEGER
    },
    id_categoria: {
        type:Sequelize.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
})
export default Produto