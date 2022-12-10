<template>
  <div class="common-layout">
    <el-container class="full_height">
      <el-header class="header">Header</el-header>
      <el-main class="content">
        <EmissionTable 
          :json_data=emissions 
          :filter_unternehmen=filter_unternehmen 
          :filter_land=filter_land />
      </el-main>
      <el-footer class="footer">Footer</el-footer>
    </el-container>
  </div>
</template>


<script>
import EmissionTable from "./components/EmissionTable";


export default {
  name: 'App',
  components: {
    EmissionTable
  },
  data: () => ({
    //Test-Dummys, Backend kommt später
    emissions: [
      {id: "1", unternehmen: "MusterA", land: "China", wert: 45.002},
      {id: "2", unternehmen: "MusterB", land: "China", wert: 1134.002},
      {id: "3", unternehmen: "MusterC", land: "Amerika", wert: 415.002},
      {id: "4", unternehmen: "MusterD", land: "Amerika", wert: 314.002},
      {id: "5", unternehmen: "MusterB", land: "Deutschland", wert: 31.002},
      {id: "6", unternehmen: "MusterC", land: "Deutschland", wert: 143.002},
      {id: "7", unternehmen: "MusterD", land: "Hawaii", wert: 12.002}
    ],
    filter_unternehmen: [
      {text: "MusterA", value: "MusterA"},
      {text: "MusterB", value: "MusterB"},
      {text: "MusterC", value: "MusterC"},
      {text: "MusterD", value: "MusterD"},
    ],
    filter_land: [
    {text: "China", value: "China"},
    {text: "Amerika", value: "Amerika"},
    {text: "Deutschland", value: "Deutschland"},
    {text: "Hawaii", value: "Hawaii"},
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
  min-height:100vh;
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
