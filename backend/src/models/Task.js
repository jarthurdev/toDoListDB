import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    customId:{
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [true, "Descrição é obrigatória"]
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Incrementar id personalizado antes de salvar

taskSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastTask = await mongoose.model('Task').findOne().sort({ customId: -1 });
        this.customId = lastTask ? lastTask.customId + 1 : 1;
    }
    next();
});

const Task = mongoose.model('Task', taskSchema);
export default Task;     