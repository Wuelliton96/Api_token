import express from "express"
import { createCategoria, deleteCategoria, getCategoria, updateCategoria } from "../controllers/categoria_controller.js" 

const router = express.Router()

router.get('/categoria',getCategoria)
router.post('/categoria', createCategoria)
router.put('/categoria/:id', updateCategoria);
router.delete('/categoria/:id', deleteCategoria);

export default router