import express from "express"
import { createPedido, deletePedido, getPedido, getPedidos, updatePedido } from "../controllers/pedido_controller.js"

const router = express.Router()

router.get('/pedido', getPedido)
router.get('/pedido/:qtd_pedido', getPedidos)
router.post('/pedido', createPedido)
router.put('/pedido/:cod', updatePedido)
router.delete('/pedido/:cod', deletePedido)

export default router
