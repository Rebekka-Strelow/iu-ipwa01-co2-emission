<template>
    <el-container class="full_height">
      <el-header class="header">
        <HeaderImage />
      </el-header>
      <el-main class="content">
        <EmissionTable 
          :json_data=emissions 
          :filter_unternehmen=filter_unternehmen 
          :filter_land=filter_land />
      </el-main>
      <el-footer class="footer">Footer</el-footer>
    </el-container>
</template>


<script>
import EmissionTable from "./components/EmissionTable";
import HeaderImage from "./components/HeaderImage";


export default {
  name: 'App',
  components: {
    EmissionTable, HeaderImage
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
html,body {
 height:100vh;
 margin: 0;
 padding: 0;
 background-color: #87d5ca;
 display: flex;
 justify-content: center;
}


.full_height{
  width: 80vw;
  border: 1px solid #398378;
  background-color: #398378;
  border-radius: 2%;
  height: 96vh;
  margin-top: 1%;
  margin-bottom: 1%;
}

.header{
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  height: auto;
}

.content{
  background-color: white;
  padding-left: 5%;
  padding-right: 5%;
}

.footer {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  height: auto;
}

.finished {
  text-decoration: line-through;
}

</style>
