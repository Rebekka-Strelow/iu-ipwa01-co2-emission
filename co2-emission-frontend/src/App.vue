<template>
  <div class="common-layout">
    <el-container class="full_height">
      <el-header class="header">Header</el-header>
      <el-main class="content">
        <TodoList :items="todos" />
      </el-main>
      <el-footer class="footer">Footer</el-footer>
    </el-container>
  </div>
</template>


<script>
import TodoList from "./components/ToDoList"

export default {
  name: 'App',
  components: {
    TodoList
  },
  data: () => ({
    test: "hello",
    todos: [
    {id: "1", desc: "Vue lernen", done: true},
    {id: "2", desc: "Jasmine lernen", done: false},
    {id: "3", desc: "Element+ lernen", done: false},
    {id: "4", desc: "Arbeit schreiben", done: false},
    ]
  }),
}
</script>

<style>
html,body{
 height:100vh;
 margin: 0;
 padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.full_height{
  height:100vh;
}

.header{
  background-color: rgb(255, 180, 180);
}

.content{
  background-color: rgb(255, 170, 255);
}

.footer {
  background-color: rgb(186, 186, 255);
}

.finished {
  text-decoration: line-through;
}

</style>
