<template>
  <div class="task-container">
    <div class="task-list" @click="handleShowSubtask">
      <input
        type="checkbox"
        v-model="task.status"
        @change="handleCheckboxTask(task)"
      />
      <label> {{ task.task_name ? task.task_name : "Project Name" }}</label>
      <!-- <div class="btnShowSubtask">X</div> -->
      <div class="down-of-box">
        <p>{{ subtaskCompletedAmount }} of {{ subtaskAmount }} completed</p>
        <div v-if="isShowSubtask" class="icon-arrow-down"></div>
        <div v-else class="icon-arrow-up"></div>
      </div>
    </div>
    <div v-if="isShowSubtask">
      <div v-if="subtasks">
        <div class="subtask" v-for="subtask in subtasks" :key="subtask.id">
          <input
            type="checkbox"
            v-model="subtask.subtask_status"
            @change="handleCheckboxSubtask(subtask)"
          />
          <label> {{ subtask.subtask_name }}</label
          ><br />
        </div>
      </div>
      <div class="subtask">
        <input
          type="text"
          class="subtask-input"
          placeholder="What are the steps?"
          v-model="inputSubtaskName"
        />
        <input
          type="submit"
          class="subtask-submit"
          value="New Step"
          @click="handleCreateSubtask"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Define props
const props = defineProps(["taskData"]);
// Define emit
const emit = defineEmits();

const task = ref("");
const subtasks = ref("");
const subtaskAmount = ref(0);
const subtaskCompletedAmount = ref(0);

const inputSubtaskName = ref("");
const isShowSubtask = ref(false);

onMounted(() => {
  handleTaskData(props.taskData);
  countSubTaskCompleted(props.taskData.subtasks);
});

const handleTaskData = (data) => {
  task.value = data;
  subtasks.value = data.subtasks;
  console.log("subtask.value", data.subtasks);
};

const countSubTaskCompleted = (subtaskList) => {
  let completedTask = 0;

  if (subtaskList) {
    subtaskList.forEach((element) => {
      if (element.subtask_status === true) {
        completedTask++;
      }
    });
  }
  subtaskAmount.value = subtaskList ? subtaskList.length : 0;
  subtaskCompletedAmount.value = completedTask;
};
const handleCheckboxTask = (task) => {
  emit("checkedTask", task);
};
const handleCheckboxSubtask = (subtask) => {
  console.log("subtask selected :", subtask);
  emit("checkedSubtask", subtask);
};

const handleCreateSubtask = () => {
  console.log("clicked :", task.value.id);

  console.log("submit clicked :", inputSubtaskName.value);

  emit("clickedCreateSubmit", {
    taskId: task.value.id,
    subtaskName: inputSubtaskName.value,
  });
};
const handleShowSubtask = () => {
  if (isShowSubtask.value) {
    isShowSubtask.value = false;
  } else isShowSubtask.value = true;
};
</script>

<style>
.task-container {
  width: 100%;
  /* width: auto; */
  min-height: 80px;
  height: auto;
  /* border: solid 1px #333; */
}
.down-of-box {
  position: absolute;
  margin: 0;
  right: 30px;
  bottom: 5px;
  width: auto;
}
.task-container p {
  position: absolute;
  margin: 0;
  right: 10px;
  bottom: 5px;
}
.down-of-box .icon-arrow-down {
  position: absolute;
  right: -15px;
  bottom: 15px;
}

.down-of-box  .icon-arrow-up{
  position: absolute;
  right: -15px;
  bottom: 10px;
}
.icon-arrow-down {
  width: 10px;
  height: 10px;
  border-left: solid 2px #000;
  border-bottom: solid 2px #000;
  transform: rotate(-45deg);
}
.icon-arrow-up {
  width: 10px;
  height: 10px;
  border-left: solid 2px #000;
  border-bottom: solid 2px #000;
  transform: rotate(135deg);
}
.task-list {
  position: relative;
  width: 100%;
  height: 80px;
  border: solid 1px #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}
.task-list label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 500px;
  color: #000;
  font-weight: 600;
}
.subtask label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  color: #555;
}
.subtask {
  position: relative;
  width: 90%;
  height: 50px;
  border: solid 1px #333;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
}

.subtask-input {
  position: absolute;
  width: 100%;  height: 50px;
}
.subtask-submit {
  position: absolute;
  right: 20px;
}
.btnShowSubtask {
  position: absolute;
  right: 0;
}
input[type="checkbox"]{
  width: 20px;
  height: 20px;
  accent-color: #0096EB;
}
</style>
