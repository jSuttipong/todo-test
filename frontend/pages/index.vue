<template>
    <div>
      <h1>Nuxt Frontend</h1>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const message = ref('')
  
  // Fetch message from the backend API
  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/message')
      const data = await response.json()
      message.value = data.message
    } catch (error) {
      console.error('Error fetching message:', error)
    }
  })
  </script>