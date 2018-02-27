<template>
  <div class="test">
    <form v-on:submit="addTask">
      <h1>{{projectName}}</h1>
      <div>
        <input type="text" v-model="projectName">
      </div>
      <input type="text" v-model="newTask.task" placeholder="Add new task">
      <input type="text" v-model="newTask.description" placeholder="Notes">
      <input type="submit" value="Submit">
    </form>
    <div>
    </div>
    <ul id="taskList">
      <li id="taskItem" v-for="(task, index) in tasks">
        <div id="card">
          <input type="checkbox" class="toggle" v-model="task.isChecked">
          <span :class="{isChecked: task.isChecked}">
            <b>Task:</b> {{task.task}} <b>About:</b> {{task.description}}
            <br>
            <input type="text" v-model="task.task" placeholder="Edit task">
            <input type="text" v-model="task.description" placeholder="Edit desc.">
          </span>
        </div>
        <button id="delete" v-on:click="deleteTask(task, index)">X</button>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'test',
    data() {
      return {
        newTask: {},
        projectName: "Name your list",
        tasks: [
          {
            task: "Get milk",
            description: "Pick up by 5PM",
            isChecked: false
          },
          {
            task: "Walk the dog",
            description: "He's hungry",
            isChecked: false
          },
          {
            task: "Mow the lawn",
            description: "The grass is getting out of hand",
            isChecked: false
          }
        ]
      }
    },
    methods: {
      addTask: function(e){
        this.tasks.push({
          task: this.newTask.task,
          description: this.newTask.description,
          isChecked: false
        });
        e.preventDefault();

      },
      deleteTask: function(task, index){
        this.tasks.splice(index, 1);
      },
      editTask: function(task, desc){
        this.task.description
      }
    }
  }
</script>

<style scoped>
  .isChecked{
    text-decoration: line-through;
  }
  #card{
    background-color: white;
    display:inline-block;
    width:50%;
    border:1px solid lightgrey;
    padding:5px;
    margin: 0 0 5px 0;

  }
  ul{
    list-style-type:none;
    padding-left:0;
  }
  li{
  }
  body {
  background: #e2e1e0;
  text-align: center;
  }
  h4{
    padding:0;
    margin: 0;
    white-space: nowrap;
  }
  #delete{
    background-color: LightCoral;
    color:white;
    border: none;
    border-radius: 20px;
    font-size: 20px;
    width: 30px;
    height: 30px;
    font-weight: 600;
  }

</style>
