import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Categoria = db.define('categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome_categoria: {
        type:Sequelize.STRING(100)
    },
},
{
  timestamps: false,
    freezeTableName: true
})

export default Categoria