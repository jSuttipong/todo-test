// Base API URL
const baseURL = process.env.API_URL || "http://localhost:5000/";

// Generic function to handle API requests
const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("An error occurred during the API call.");
  }

  return await response.json();
};

// Getting tasks
export const apiGetTasks = async () => {
  return fetchAPI("api/getTasks", {
    method: "GET",
  });
};

// Create Task
export const apiCreateTask = async (taskData) => {
  return fetchAPI("api/createTask", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
};

export const apiCreateSubtask = async (subtaskData) => {
  return fetchAPI("api/createSubtask", {
    method: "POST",
    body: JSON.stringify(subtaskData),
  });
};


// Updating a task
export const apiUpdateTask = async (taskId, taskStatus) => {
  return fetchAPI(`api/tasks/${taskId}/status`, {
    method: 'PUT',
    body: JSON.stringify(taskStatus),
  });
};

// Updating a Subtask
export const apiUpdateSubtask = async (subtaskId, subtaskStatus) => {
  return fetchAPI(`api/subtask/${subtaskId}/status`, {
    method: 'PUT',
    body: JSON.stringify(subtaskStatus),
  });
};