<template>
  <div id="app">
    <ul>
      <li>
        <test></test>
        <test></test>
        <test></test>
      </li>
    </ul>
  </div>
</template>

<script>
import Test from './components/todoList'
//import Hello from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    Test
   }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
ul{
  list-style-type: none;
}
</style>
