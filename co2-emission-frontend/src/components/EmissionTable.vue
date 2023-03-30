<template>
  <div>
    <h1>CO²-Ausstoß pro Unternehmen und Land</h1>
    <SearchBar @search="search" @reset="reset" type="data" :alignment="alignment"/>
    <el-table :data="json_data" 
              show-summary
              sum-text="Summe:"
              :class="alignment">
      <el-table-column :align="alignmentAsWord" property="unternehmen" label="Unternehmen" :filters="filter_unternehmen" :filter-method="filterHandler_Unternehmen" sortable/>
      <el-table-column :align="alignmentAsWord" property="land" label="Land" :filters="filter_land" :filter-method="filterHandler_Land" sortable/>
      <el-table-column :align="alignmentAsWord" property="wert" label="CO²-Ausstoß" sortable/>
    </el-table>
  </div>
</template>

<script> 
import SearchBar from './SearchBar.vue';

export default {
  components: { SearchBar },
  name: "EmissionTable",
  props: ['json_data', 'filter_unternehmen', 'filter_land', 'alignment'],
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
  },
  computed: {
    alignmentAsWord(){
      if (this.alignment == 'ltr') return 'left';
      return 'right';
    }
  }

}
</script>

<style>


</style>