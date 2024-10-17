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
      if (row.subtask_id) {
        tasksMap[taskId].subtasks.push({
            subtask_id: row.subtask_id,
            subtask_name: row.subtask_name,
            subtask_status: row.subtask_status,
          });
      }
    });
  
    // Convert the tasksMap back to an array of tasks
    return Object.values(tasksMap);
  };

  module.exports = { groupTasksWithSubtasks };