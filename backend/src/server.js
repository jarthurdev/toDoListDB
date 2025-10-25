import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/TaskRoutes.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); //TESTE DO ENV

const app = express();

//Middlewares (sempre antes das rotas)
app.use(cors());
app.use(express.json());

//Conectar com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch((err) => console.error("Erro ao conectar MongoDB: ", err));

//Rota teste
app.use("/tasks", taskRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
