<template>
  <div class="common-layout">
    <el-container class="full_height">
      <el-header class="header">Header</el-header>
      <el-main class="content">Main</el-main>
      <el-footer class="footer">Footer</el-footer>
    </el-container>
  </div>
</template>


<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    test: "hello"
  })
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
  text-align: center;
  color: #2c3e50;
}

.full_height{
  height:100vh;
}

.header{
  background-color: red;
}

.content{
  background-color: purple;
}

.footer {
  background-color: blue;
}

</style>
