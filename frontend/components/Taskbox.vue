<template>
    <div class="task-container">
        <div class="task-list">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="task name">
            <label for="vehicle1"> Task name</label><br>
            <p>count</p>
        </div>
        <div class="subtask">
            <input type="checkbox" id="sub" name="sub" value="sub">
            <label for="sub"> SubTask name</label><br>
        </div>
        <div class="subtask">
           <input type="text" class="subtask-input">
           <input type="submit" class="subtask-submit">
        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


</script>

<style>
.task-container{
    width: 200px;
    min-height: 50px;
    height: auto;
    /* border: solid 1px #333; */
}
.task-container p {
    margin: 0;
}
.task-list{
    position: relative;
    width: 100%;
    height: 50px;
    border: solid 1px #333;
}
.subtask{
    position: relative;
    width: 90%;
    height: 50px;
    border: solid 1px #333;
    left: 0;
    right: 0;
    margin: auto;
    
}
.subtask-input{
    position: absolute;
}
.subtask-submit{
    position: absolute;
    right: 0;
}
</style>