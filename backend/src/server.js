import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Task from './models/Task.js'; // importe antes das rotas

dotenv.config();

const app = express();

//Middlewares (sempre antes das rotas)
app.use(cors());
app.use(express.json());

//Conectar com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch((err) => console.error("Erro ao conectar MongoDB: ", err));

//Rota teste
app.get("/", (req, res) => {
    res.send("API rodando");
});

//Rotas de tarefas
app.post("/tasks", async (req, res) => {
    console.log("req.body:", req.body); // deve mostrar seu JSON corretamente
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
