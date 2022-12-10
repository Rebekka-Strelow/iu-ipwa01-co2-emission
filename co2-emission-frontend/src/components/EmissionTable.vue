<template>
    <el-table :data="json_data" height="50vh">
      <el-table-column property="id" width="50" />
      <el-table-column property="unternehmen" label="Unternehmen" :filters="filter_unternehmen" :filter-method="filterHandler_Unternehmen" sortable/>
      <el-table-column property="land" label="Land" :filters="filter_land" :filter-method="filterHandler_Land" sortable/>
      <el-table-column property="wert" label="CO²-Ausstoß" sortable/>
    </el-table>
</template>

<script> 

export default {
  name: "EmissionTable",
  props: ['json_data', 'filter_unternehmen', 'filter_land'],
  methods: {
    filterHandler_Unternehmen(value, row){
      return row.unternehmen == value;
    },
    filterHandler_Land(value, row){
      return row.land == value;
    } 
  }
}
</script>

<style>

  el-table {
    width: 100%;
  }

</style>