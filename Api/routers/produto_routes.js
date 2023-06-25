import express from "express"
import { createProduto, deleteProduto, getProduto, getProdutos, updateProduto } from "../controllers/produto_controller.js"

const router = express.Router()

router.get('/produto', getProduto)
router.get('/produto/:cat', getProdutos)
router.post('/produto', createProduto)
router.put('/produto/:cod', updateProduto)
router.delete('/produto/:cod', deleteProduto)

export default router