const pool = require("../config/db");
const { groupTasksWithSubtasks } = require('../utils/taskUtils');

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT tasks.id AS task_id,
        tasks.created_at,
        tasks.status ,
        tasks.task_name,
        subtask.subtask_name,
        subtask.id AS subtask_id,
        subtask.status AS subtask_status  
        FROM tasks 
        LEFT JOIN subtask ON subtask.task_id = tasks.id;
        `
    );

    // Group the tasks with subtasks
    const groupedTasks = groupTasksWithSubtasks(result.rows);
  
      // Send the response
      res.json(groupedTasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const createTask = async (req, res) => {
    
  const { task_name, status } = req.body;

  if (!task_name) {
    return res.status(400).json({ error: 'Task name is required' });
  }
  try {
    const query = `
      INSERT INTO tasks (task_name, status) 
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [task_name, status || false];
    const result = await pool.query(query, values);

    // Send the newly created task as the response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const createSubtask = async (req, res) => {
    
  const { subtask_name, task_id, status } = req.body;

  if (!subtask_name) {
    return res.status(400).json({ error: 'Subtask name is required' });
  }
  try {
    const query = `
      INSERT INTO subtask (subtask_name, task_id, status) 
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [subtask_name, task_id, status || false];
    const result = await pool.query(query, values);

    // Send the newly created task as the response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params; // Get task ID from URL parameter
  const { status } = req.body; // Get new status from request body

  if (typeof status !== 'boolean') {
    return res.status(400).json({ error: 'Status must be a boolean (true/false)' });
  }

  try {
    const query = `
      UPDATE tasks
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [status, id];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Send the updated task as the response
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }

};

const updateSubtaskStatus = async (req, res) => {
  const { id } = req.params; // Get task ID from URL parameter
  const { status } = req.body; // Get new status from request body

  if (typeof status !== 'boolean') {
    return res.status(400).json({ error: 'Status must be a boolean (true/false)' });
  }

  try {
    const query = `
      UPDATE subtask
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [status, id];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Send the updated task as the response
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }

};

module.exports = { getTasks, createTask, createSubtask, updateTaskStatus, updateSubtaskStatus };
