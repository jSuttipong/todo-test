<template>
    <div>
      <!-- <h1>Nuxt Frontend</h1> -->
      <!-- <p>{{ message }}</p> -->
      <h1>TODO</h1>
      <input type="text" v-model="inputTodoName" placeholder="What to do?">
      <input type="submit" @click="creatTodo">

      <Taskbox />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const message = ref('')
  const inputTodoName = ref('')
  // Fetch message from the backend API
  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks')
      const data = await response.json()
      message.value = data.message
    } catch (error) {
      console.error('Error fetching message:', error)
    }
  })

  const creatTodo = () =>{
    console.log("Created :", inputTodoName.value);
  }
  </script>