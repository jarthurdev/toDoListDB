import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: "Error ao criar tarefa", details: error.message })
    }
}

export const getTask = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(201).json(tasks)
    } catch (error) {
        res.status(500).json({ error: "Error ao buscar tarefa"})
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!task) return res.status(404).json({ error: "Tarefa não encontrada "});
        res.json(task)
    } catch (error) {
        res.status(400).json({error: "Error ao atualizar tarefa", details: error.message});
    }
};

export const deletTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ error: "Tarefa não encontrada"});
        res.json({ message: "Tarefa deletada com sucesso"});
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar tarefa", details: error.message})
    }
}