import { Sequelize } from "sequelize";

const db = new Sequelize('compras', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
export default db