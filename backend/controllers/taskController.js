const pool = require("../config/db");

const groupTasksWithSubtasks = (data) => {
    const tasksMap = {};
  
    data.forEach(row => {
      const taskId = row.task_id;
  
      // If the task is not already in the map, add it
      if (!tasksMap[taskId]) {
        tasksMap[taskId] = {
          id: row.task_id,
          created_at: row.created_at,
          status: row.status,
          task_name: row.task_name,
          subtasks: [],
        };
      }
  
      // Add the subtask to the corresponding task
      tasksMap[taskId].subtasks.push({
        subtask_id: row.subtask_id,
        subtask_name: row.subtask_name,
        subtask_status: row.subtask_status,
      });
    });
  
    // Convert the tasksMap back to an array of tasks
    return Object.values(tasksMap);
  };

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT task.id AS task_id,
        task.created_at,
        task.status ,
        task.task_name,
        subtask.subtask_name,
        subtask.id AS subtask_id,
        subtask.status AS subtask_status  
        FROM task 
        LEFT JOIN subtask ON subtask.task_id = task.id;
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

module.exports = { getTasks };
