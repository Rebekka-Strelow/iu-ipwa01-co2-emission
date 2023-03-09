<template>
  <div>
    <h1>CO²-Ausstoß pro Unternehmen und Land</h1>
    <SearchBar @search="search" @reset="reset" type="data"/>
    <el-table :data="json_data" 
              show-summary
              sum-text="Summe:">
      <el-table-column property="unternehmen" label="Unternehmen" :filters="filter_unternehmen" :filter-method="filterHandler_Unternehmen" sortable/>
      <el-table-column property="land" label="Land" :filters="filter_land" :filter-method="filterHandler_Land" sortable/>
      <el-table-column property="wert" label="CO²-Ausstoß" sortable/>
    </el-table>
  </div>
</template>

<script> 
import SearchBar from './SearchBar.vue';

export default {
  components: { SearchBar },
  name: "EmissionTable",
  props: ['json_data', 'filter_unternehmen', 'filter_land'],
  methods: {
    filterHandler_Unternehmen(value, row){
      return row.unternehmen == value;
    },
    filterHandler_Land(value, row){
      return row.land == value;
    },
    reset(target){
      this.$emit('reset', target);
    },
    search(target, text){
      this.$emit('search', target, text);
    }
  }
}
</script>

<style>

</style>