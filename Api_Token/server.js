import express from "express";
import cors from "cors";
import db from "./config/database.js";
import categoria_ from "./routers/categoria_routes.js";
import pedido_ from "./routers/pedido_routes.js";
import produto_ from "./routers/produto_routes.js";
import { config } from "dotenv-safe";
import jwt from 'jsonwebtoken';
import http from "http";
import Categoria from "./models/categoria_model.js";
import Pedido from "./models/pedido_model.js";
import Produto from "./models/produto_model.js";

config();

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ message: "Servidor base '/' funcionando" });
});

server.post('/login', (req, res) => {
  if ((req.body.user === 'wuelliton') && (req.body.pwd === '12345')) {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 60
    });
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({ message: "Lógin Inválido" });
});

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'Não há token' });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: "Erro com a autenticação do Token" });

    req.userId = decoded.id;
    next();    
  });
}

try {
  await db.authenticate();
  console.log("Conexão com o MySQL estabelecida!");
} catch (e) {
  console.log("Conexão com o MySQL não estabelecida", e);
}

Pedido.associate = (models) => {
  Pedido.hasMany(models.Produto,
    { foreignKey: 'cod_produto', as: 'produto' }
  );
};

Produto.associate = (models) => {
  Produto.hasMany(models.Categoria,
    { foreignKey: 'id_categoria', as: 'categoria' }  
  );
};

Pedido.belongsTo(Produto, { foreignKey: 'cod_produto', allowNull: true });
Produto.belongsTo(Categoria, { foreignKey: 'id_categoria', allowNull: true });

const app = http.createServer(server);

server.use(categoria_,verifyJWT);
server.use(pedido_,verifyJWT);
server.use(produto_,verifyJWT);
app.listen(6100, () => console.log("server executando em http://localhost:6100"));