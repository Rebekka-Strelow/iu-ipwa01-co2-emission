<template>
  <div class="common-layout">
    <el-container class="full_height">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
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

</style>
