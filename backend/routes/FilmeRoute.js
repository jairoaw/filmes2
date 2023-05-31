import express from "express";
import { 
    getFilmes, 
    getFilmeById,
    saveFilme,
    updateFilme,
    deleteFilme,
    showFilme
} from "../controllers/FilmeController.js";

const router = express.Router();

// associa as rotas ao seu método do Controller
router.get('/filmes', getFilmes); //index
router.get('/filmes/:id', getFilmeById);
router.post('/filmes', saveFilme);
router.patch('/filmes/:id', updateFilme);
router.delete('/filmes/:id', deleteFilme);
router.get('/filmes/:id/show', showFilme);

export default router;
