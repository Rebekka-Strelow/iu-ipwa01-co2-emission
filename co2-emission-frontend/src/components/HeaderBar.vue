<template>
        <el-menu 
          class="headerBar" 
          mode="horizontal"
          @select="handleSelect">
            <el-menu-item index="1">Hauptseite</el-menu-item>
            <el-menu-item index="2">Informationen</el-menu-item>
            <!-- <div class="flex-grow"></div> -->
            <el-sub-menu index="3">
              <template #title >Aktionen</template>
              <el-menu-item index="3-1">Daten neu einlesen</el-menu-item>
              <el-menu-item index="3-2">Filter neu berechnen</el-menu-item>
            </el-sub-menu>
        </el-menu>  
</template>

<script>

export default {
  name: "HeaderBar",
  methods: {
    handleSelect(key){
      if(key == "1"){
        this.$emit('goto', 'main');
      } else if (key == "2") {
        this.$emit('goto', 'info');
      } else if (key == "3-1") {
        this.$emit('reload', 'data');
      } else if (key == "3-2") {
        this.$emit('reload', 'filters');
      }
    }
  }
  // props: [
  //   'mode'
  // ]
}

</script>

<style>

</style>