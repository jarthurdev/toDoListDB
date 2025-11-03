import { useState, useEffect } from "react";
import api from "../services/API";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    // Buscar tarefas
    useEffect(() => {
        api.get('/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, [])

    // Criar tarefa
    const handleAddTask = async () => {
        if (!title.trim()) return;
        const res = await api.post('/tasks', { title });
        setTasks([...tasks, res.data]);
        setTitle("");
    }

    //Deletar tarefa
    const handleDeleteTask = async (id) => {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    }

      // Atualizar tarefa (toggle)
    const handleToggleTask = async (id, completed) => {
        const res = await api.put(`/tasks/${id}`, { completed: !completed });
        setTasks(tasks.map(task => task._id === id ? res.data : task));
    }

    return (
        <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 To-Do List</h1>

      <div className="flex mb-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nova tarefa..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between items-center mb-2">
            <span
              onClick={() => handleToggle(task._id, task.completed)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleDelete(task._id)}
              className="text-red-500 hover:underline"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}