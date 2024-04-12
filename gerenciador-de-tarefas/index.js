const express = require('express');
const app = express();
const PORT = 3000; // ou a porta que desejar

// Código para verificar se o Express está funcionando corretamente
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});

// Código para operações CRUD em uma lista de tarefas
app.use(express.json());

let tasks = []; // array para armazenar as tarefas
let nextTaskId = 1; // variável para controlar o ID da próxima tarefa

// Rota para recuperar todas as tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para recuperar uma tarefa específica por meio de seu identificador
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(task);
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const newTask = { id: nextTaskId++, ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa existente com base em seu identificador
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
});

// Rota para remover uma tarefa da lista com base em seu identificador
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).end();
});

// Código para adicionar tarefas automaticamente
const addInitialTasks = () => {
    // Adicione as tarefas iniciais aqui
    const initialTasks = [
        { title: "Tarefa 1", description: "Descrição da Tarefa 1" },
        { title: "Tarefa 2", description: "Descrição da Tarefa 2" },
        // Adicione quantas tarefas desejar
    ];

    initialTasks.forEach(task => {
        const newTask = { 
            id: nextTaskId++, // Gere um novo ID para a tarefa
            title: task.title,
            description: task.description
        };
        tasks.push(newTask);
    });
};

// Adiciona tarefas automaticamente quando o servidor é iniciado
addInitialTasks();

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
