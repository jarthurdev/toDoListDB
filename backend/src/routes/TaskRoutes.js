import express from 'express';
import { createTask, 
    deletTask, 
    getTask, 
    updateTask } from '../controllers/TaskController.js';

const router = express.Router();

//Rotas de tarefas
router.post("/", createTask)
router.get("/", getTask)
router.put("/:id", updateTask)
router.delete("/:id", deletTask)

export default router;