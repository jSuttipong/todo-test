<template>
  <div class="container page-display">
    <!-- <h1>Nuxt Frontend</h1> -->
    <!-- <p>{{ message }}</p> -->
    <div class="contents">
      <h1>TODO</h1>
      <input type="text" v-model="inputTodoName" placeholder="What to do?" />
      <input type="submit" value="New List" @click="createTodo" />
      <!-- {{ tasksList }} -->
      <div class="tasks-contents">
        <div v-for="task in tasksList" :key="task.id" style="width: 100%">
          <Taskbox
            :taskData="task"
            @checkedTask="handleTaskStatus"
            @checkedSubtask="handleSubtaskStatus"
            @clickedCreateSubmit="createSubtask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  apiGetTasks,
  apiCreateTask,
  apiUpdateTask,
  apiCreateSubtask,
  apiUpdateSubtask,
} from "@/API";

const inputTodoName = ref("");
// const apiUrl = useRuntimeConfig().public.apiUrl;
  
// const tesksData = ref('')
const tasksList = ref("");

onMounted(async () => {
  try {
    getTasksFromApi();
  } catch (error) {
    console.error("Error fetching message:", error);
  }
});

// const mapTasksData = (data) => {
//   tasksList.value = data;
// };

const getTasksFromApi = async () => {
  const data = await apiGetTasks();
  tasksList.value = data;
};

// Created new task
const createTodo = async () => {
  try {
    await apiCreateTask({
      task_name: inputTodoName.value,
    });
    // tasksList.value = await apiGetTasks(); // Refresh the task list
    getTasksFromApi()
  } catch (error) {
    console.error("Failed to create task", error);
  }
};

const handleTaskStatus = async (data) => {
  try {
    await apiUpdateTask(data.id, {
      status: data.status,
    });
  } catch (error) {
    console.error("Failed to update task", error);
  }
};

const createSubtask = async (data) => {
  try {
    await apiCreateSubtask({
      subtask_name: data.subtaskName,
      task_id: data.taskId,
    });
    // tasksList.value = await apiGetTasks(); // Refresh the task list
    getTasksFromApi()
  } catch (error) {
    console.error("Failed to create task", error);
  }
};

const handleSubtaskStatus = async (data) => {
  try {
    await apiUpdateSubtask(data.subtask_id, {
      status: data.subtask_status,
    });
  } catch (error) {
    console.error("Failed to update task", error);
  }
};
</script>

<style>
.container {
  max-width: 740px;
  width: auto;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;
  position: relative;
}
.container h1 {
  text-align: center;
  margin-top: 50px;
}

.page-display {
  left: 0;
  right: 0;
  margin: auto;
}

.tasks-contents {
  position: absolute;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  left: 0;
  right: 0;
  margin: 30px auto;
  padding: 0 20px;
}
</style>
