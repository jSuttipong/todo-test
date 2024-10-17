const express = require('express');
const { getTasks, createTask, createSubtask, updateTaskStatus, updateSubtaskStatus } = require('../controllers/taskController');

const router = express.Router();

// Route to get all tasks
router.get('/getTasks', getTasks);

// POST Insert a new task
router.post('/createTask', createTask);
router.post('/createSubtask', createSubtask);

// PUT Update task status
router.put('/tasks/:id/status',updateTaskStatus);
router.put('/subtask/:id/status',updateSubtaskStatus)


module.exports = router;